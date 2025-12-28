import { useEffect, useState, useCallback, useRef } from 'react';
import { Arrow } from './Arrow';
import styles from './ScrollReminder.module.css';
import { useUI } from '../../context/UIContext';

export const ScrollReminder = () => {
    const { isLocked } = useUI();
    const [show, setShow] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const timeoutRef = useRef(null);

    const isAtEnd = useCallback(() => {
        const docEl = document.documentElement;
        const scrollTop = window.scrollY || docEl.scrollTop;
        const viewportHeight = window.innerHeight;
        const pageHeight = docEl.scrollHeight;
        return scrollTop + viewportHeight >= pageHeight - 4;
    }, []);

    const scheduleShow = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if (!isAtEnd()) {
                setShow(true);
            }
        }, 1000);
    }, [isAtEnd]);

    useEffect(() => {
        const handleScroll = () => {
            if (isAtEnd()) {
                setDismissed(true);
                setShow(false);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                return;
            }

            setShow(false);
            scheduleShow();
        };

        const handleResize = () => {
            if (isAtEnd()) {
                setDismissed(true);
                setShow(false);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }
        };

        if (!isAtEnd() && !isLocked) {
            scheduleShow();
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isAtEnd, scheduleShow, isLocked]);

    // When un-locking, if we are not at end, schedule show
    useEffect(() => {
        if (!isLocked && !dismissed && !isAtEnd()) {
            scheduleShow();
        } else if (isLocked) {
            setShow(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [isLocked, dismissed, isAtEnd, scheduleShow]);

    if (dismissed || isLocked) return null;

    return (
        <div className={`${styles.container} ${show ? styles.visible : ''}`}>
            <p className={styles.text}>Desliza para leer</p>
            <div className={styles.arrow}>
                <Arrow />
            </div>
        </div>
    );
}
