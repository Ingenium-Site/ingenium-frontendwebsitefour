import React, { cloneElement, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const AnimateOnScroll = ({
    children,
    animation = 'fadeInUp',
    delay = 0,
    speed = 'normal',
    threshold = 0.15,
    resetKey, // New prop to control animation reset
}) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [localResetKey, setLocalResetKey] = useState(0);
    
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold,
    });

    // Update local key when parent reset key changes
    useEffect(() => {
        setLocalResetKey(prev => prev + 1);
        setShouldAnimate(false); // Reset animation state
    }, [resetKey]);

    // Set animation when element comes into view (but not immediately after reset)
    useEffect(() => {
        if (inView && resetKey !== undefined) {
            // Small delay to ensure reset has processed
            const timer = setTimeout(() => {
                setShouldAnimate(inView);
            }, 50);
            
            return () => clearTimeout(timer);
        } else {
            setShouldAnimate(inView);
        }
    }, [inView, resetKey]);

    const speedClass = {
        normal: '',
        fast: 'animate__fast',
        slow: 'animate__slow',
    }[speed];

    // Make sure children is a single React element
    const child = React.Children.only(children);

    // Clone child, add ref, class, and opacity style
    return cloneElement(child, {
        key: localResetKey, // Use key to force re-render on reset
        ref,
        className: `${child.props.className || ''} animate__animated ${
            shouldAnimate ? `animate__${animation} ${speedClass}` : ''
        }`.trim(),
        style: {
            ...child.props.style,
            opacity: shouldAnimate ? 1 : 0,
            animationDelay: shouldAnimate ? `${delay}ms` : undefined,
        },
    });
};

AnimateOnScroll.displayName = 'AnimateOnScroll';

export default AnimateOnScroll;