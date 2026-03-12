import React, { cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const AnimateOnScroll = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  speed = 'normal',
  threshold = 0.12,
  resetKey,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [localResetKey, setLocalResetKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [manualInView, setManualInView] = useState(false);
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
    setManualInView(false);
  }, [resetKey]);

  useEffect(() => {
    if (hasIntersectionObserver) return;
    const el = hostRef.current;
    if (!el) return;

    let rafId = 0;
    const check = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      if (!vh) return;

      // Consider it "in view" once the top is within (1 - threshold) of the viewport.
      const triggerLine = vh * (1 - Math.min(0.95, Math.max(0, threshold)));
      const isVisible = rect.top <= triggerLine && rect.bottom >= 0;
      setManualInView(isVisible);
    };

    const onEvent = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(check);
    };

    check();
    window.addEventListener('scroll', onEvent, { passive: true });
    window.addEventListener('resize', onEvent, { passive: true });
    window.addEventListener('orientationchange', onEvent, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onEvent);
      window.removeEventListener('resize', onEvent);
      window.removeEventListener('orientationchange', onEvent);
    };
  }, [hasIntersectionObserver, threshold]);

  useEffect(() => {
    if (reduceMotion) {
      setShouldAnimate(true);
      return;
    }

    const effectiveInView = hasIntersectionObserver ? inView : manualInView;
    if (effectiveInView) {
      // Use rAF to avoid missing very short intersections on fast mobile scroll.
      const raf = window.requestAnimationFrame(() => setShouldAnimate(true));
      return () => window.cancelAnimationFrame(raf);
    }

    setShouldAnimate(false);
    return undefined;
  }, [reduceMotion, inView, manualInView, resetKey, hasIntersectionObserver]);

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
