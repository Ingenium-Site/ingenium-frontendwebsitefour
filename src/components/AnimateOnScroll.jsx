import React, { cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const manualViewSubscribers = new Set();
let manualViewListenersAttached = false;
let manualViewRafId = 0;
let manualViewOnEvent = null;

const attachManualViewListeners = () => {
  if (typeof window === 'undefined') return;
  if (manualViewListenersAttached) return;
  manualViewListenersAttached = true;

  manualViewOnEvent = () => {
    if (manualViewRafId) return;
    manualViewRafId = window.requestAnimationFrame(() => {
      manualViewRafId = 0;
      manualViewSubscribers.forEach((fn) => fn());
    });
  };

  window.addEventListener('scroll', manualViewOnEvent, { passive: true });
  window.addEventListener('resize', manualViewOnEvent, { passive: true });
  window.addEventListener('orientationchange', manualViewOnEvent, { passive: true });
};

const detachManualViewListenersIfIdle = () => {
  if (typeof window === 'undefined') return;
  if (!manualViewListenersAttached) return;
  if (manualViewSubscribers.size) return;

  if (manualViewRafId) {
    window.cancelAnimationFrame(manualViewRafId);
    manualViewRafId = 0;
  }

  if (manualViewOnEvent) {
    window.removeEventListener('scroll', manualViewOnEvent);
    window.removeEventListener('resize', manualViewOnEvent);
    window.removeEventListener('orientationchange', manualViewOnEvent);
    manualViewOnEvent = null;
  }

  manualViewListenersAttached = false;
};

const AnimateOnScroll = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  speed = 'normal',
  threshold = 0.12,
  repeat = true,
  resetKey,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [localResetKey, setLocalResetKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [manualInView, setManualInView] = useState(false);
  const manualInViewRef = useRef(false);
  const hostRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncPreference = () => {
      setReduceMotion(reducedMotionQuery.matches);
    };

    syncPreference();

    if (typeof reducedMotionQuery.addEventListener === 'function') {
      reducedMotionQuery.addEventListener('change', syncPreference);
      return () => reducedMotionQuery.removeEventListener('change', syncPreference);
    }

    reducedMotionQuery.addListener(syncPreference);
    return () => reducedMotionQuery.removeListener(syncPreference);
  }, []);

  const hasIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;
  const needsManualInView = (() => {
    if (typeof window === 'undefined') return false;
    if (!hasIntersectionObserver) return true;

    const viewportWidth = window.innerWidth || document.documentElement?.clientWidth || 0;
    if (viewportWidth && viewportWidth <= 900) return true;

    if (typeof window.matchMedia === 'function') {
      return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    }

    return false;
  })();

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: reduceMotion ? 0 : threshold,
    rootMargin: '0px 0px -8% 0px',
    // If IntersectionObserver is missing (some in-app browsers), don't mark
    // everything as "in view" on load (that makes animations run offscreen).
    fallbackInView: false,
  });

  useEffect(() => {
    setLocalResetKey((prev) => prev + 1);
    setShouldAnimate(false);
    manualInViewRef.current = false;
    setManualInView(false);
  }, [resetKey]);

  useEffect(() => {
    if (!needsManualInView) return;
    const el = hostRef.current;
    if (!el) return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      if (!vh) return;

      // Consider it "in view" once the top is within (1 - threshold) of the viewport.
      const triggerLine = vh * (1 - Math.min(0.95, Math.max(0, threshold)));
      const isVisible = rect.top <= triggerLine && rect.bottom >= 0;
      if (manualInViewRef.current === isVisible) return;
      manualInViewRef.current = isVisible;
      setManualInView(isVisible);
    };

    attachManualViewListeners();
    manualViewSubscribers.add(check);
    check();

    return () => {
      manualViewSubscribers.delete(check);
      detachManualViewListenersIfIdle();
    };
  }, [needsManualInView, threshold]);

  useEffect(() => {
    if (reduceMotion) {
      setShouldAnimate(true);
      return;
    }

    const effectiveInView = (hasIntersectionObserver ? inView : false) || manualInView;
    if (effectiveInView) setShouldAnimate(true);
    else if (repeat) setShouldAnimate(false);
    return undefined;
  }, [reduceMotion, inView, manualInView, resetKey, hasIntersectionObserver, repeat]);

  const speedClass = useMemo(
    () => ({
      normal: '',
      fast: 'animate__fast',
      slow: 'animate__slow',
    })[speed] || '',
    [speed]
  );

  const child = React.Children.only(children);
  const isVisible = reduceMotion || shouldAnimate;

  const mergedRef = (node) => {
    hostRef.current = node;
    if (typeof ref === 'function') ref(node);
  };

  return cloneElement(child, {
    key: localResetKey,
    ref: mergedRef,
    'data-animateonscroll': true,
    'data-animateonscroll-state': reduceMotion ? 'reduced-motion' : shouldAnimate ? 'animated' : 'hidden',
    'data-animateonscroll-io': hasIntersectionObserver ? String(!!inView) : 'no-io',
    'data-animateonscroll-manual': String(!!manualInView),
    className: `${child.props.className || ''} ${reduceMotion ? '' : 'animate__animated'} ${
      !reduceMotion && shouldAnimate ? `animate__${animation} ${speedClass}` : ''
    }`.trim(),
    style: {
      ...child.props.style,
      opacity: isVisible ? 1 : 0.001,
      transform: isVisible ? child.props.style?.transform : 'translate3d(0, 20px, 0)',
      transition: reduceMotion
        ? child.props.style?.transition
        : 'opacity 260ms ease, transform 260ms ease',
      animationDelay: !reduceMotion && shouldAnimate ? `${delay}ms` : undefined,
      willChange: reduceMotion ? child.props.style?.willChange : 'opacity, transform',
    },
  });
};

AnimateOnScroll.displayName = 'AnimateOnScroll';

export default AnimateOnScroll;
