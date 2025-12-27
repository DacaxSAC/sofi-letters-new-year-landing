import { useState, useEffect } from 'react';

export const Typewriter = ({ text, duration = 2000, delay = 0, className = '' }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let startTime;
        let animationFrameId;
        let timeoutId;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            if (progress < 0) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const totalChars = text.length;
            const charIndex = Math.min(
                Math.floor((progress / duration) * totalChars),
                totalChars
            );

            setDisplayedText(text.slice(0, charIndex));

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setDisplayedText(text);
            }
        };

        timeoutId = setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(animationFrameId);
        };
    }, [text, duration, delay]);

    return <span className={className}>{displayedText}</span>;
};
