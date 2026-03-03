import React, { cloneElement } from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const AnimateOnScroll = ({
    children,
    animation = 'fadeInUp',
    delay = 0,
    speed = 'normal',
    threshold = 0.15,
}) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold,
    });

    const speedClass = {
        normal: '',
        fast: 'animate__fast',
        slow: 'animate__slow',
    }[speed];

    // Make sure children is a single React element
    const child = React.Children.only(children);

    // Clone child, add ref, class, and opacity style
    return cloneElement(child, {
        ref,
        className: `${child.props.className || ''} animate__animated ${
            inView ? `animate__${animation} ${speedClass}` : ''
        }`.trim(),
        style: {
            ...child.props.style, // Maintain original child styles (e.g., width: 60%)
            opacity: inView ? 1 : 0, // Set opacity based on inView
            animationDelay: inView ? `${delay}ms` : undefined, // Only apply delay when inView
        },
    });
};

AnimateOnScroll.displayName = 'AnimateOnScroll';

export default AnimateOnScroll;