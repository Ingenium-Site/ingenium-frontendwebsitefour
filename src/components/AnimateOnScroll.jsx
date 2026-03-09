import React, { cloneElement, useEffect, useMemo, useState } from 'react';
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

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: reduceMotion ? 0 : threshold,
    rootMargin: '0px 0px -8% 0px',
    fallbackInView: true,
  });

  useEffect(() => {
    setLocalResetKey((prev) => prev + 1);
    setShouldAnimate(false);
  }, [resetKey]);

  useEffect(() => {
    if (reduceMotion) {
      setShouldAnimate(true);
      return;
    }

    if (inView) {
      const timer = window.setTimeout(() => {
        setShouldAnimate(true);
      }, 40);
      return () => window.clearTimeout(timer);
    }

    setShouldAnimate(false);
    return undefined;
  }, [reduceMotion, inView, resetKey]);

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

  return cloneElement(child, {
    key: localResetKey,
    ref,
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
