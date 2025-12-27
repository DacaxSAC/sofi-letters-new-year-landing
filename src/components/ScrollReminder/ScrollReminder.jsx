import { useEffect, useState } from 'react';
import { Arrow } from './Arrow';
import styles from './ScrollReminder.module.css';

export const ScrollReminder = () => {
    const [show, setShow] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        let timeout;

        const isAtEnd = () => {
            const docEl = document.documentElement;
            const scrollTop = window.scrollY || docEl.scrollTop;
            const viewportHeight = window.innerHeight;
            const pageHeight = docEl.scrollHeight;
            return scrollTop + viewportHeight >= pageHeight - 4;
        };

        const scheduleShow = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (!isAtEnd()) setShow(true);
            }, 1000);
        };

        const handleScroll = () => {
            if (isAtEnd()) {
                setDismissed(true);
                setShow(false);
                clearTimeout(timeout);
                return;
            }

            setShow(false);
            scheduleShow();
        };

        const handleResize = () => {
            if (isAtEnd()) {
                setDismissed(true);
                setShow(false);
                clearTimeout(timeout);
            }
        };

        if (!isAtEnd()) {
            timeout = setTimeout(() => setShow(true), 1000);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeout);
        };
    }, []);

    if (dismissed) return null;

    return (
        <div className={`${styles.container} ${show ? styles.visible : ''}`}>
            <p className={styles.text}>Desliza para leer</p>
            <div className={styles.arrow}>
                <Arrow />
            </div>
        </div>
    );
}
