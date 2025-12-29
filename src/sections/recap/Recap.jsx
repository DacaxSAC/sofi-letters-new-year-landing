import { useEffect, useRef } from 'react'
import styles from './Recap.module.css'
import recap1 from '../../assets/recap-1.avif'
import recap2 from '../../assets/recap-2.avif'
import recap3 from '../../assets/recap-3.avif'
import { useAsset } from '../../context/AssetContext'

export const Recap = () => {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)

    const img1 = useAsset(recap1)
    const img2 = useAsset(recap2)
    const img3 = useAsset(recap3)

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (!sectionRef.current || !trackRef.current) {
                        ticking = false;
                        return
                    }

                    const section = sectionRef.current
                    const track = trackRef.current
                    const rect = section.getBoundingClientRect()

                    const windowHeight = window.innerHeight
                    const totalScrollableHeight = rect.height - windowHeight

                    // Progress goes from 0 to 1
                    let progress = 0;
                    if (rect.top <= 0) {
                        progress = Math.min(1, Math.abs(rect.top) / totalScrollableHeight);
                    }

                    const maxMove = track.scrollWidth - window.innerWidth + 240;
                    if (maxMove > 0) {
                        track.style.transform = `translateX(-${progress * maxMove}px)`;
                    } else {
                        track.style.transform = `translateX(0px)`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section className={styles.recap} id="recap">
            <div className={styles.recapContainer} ref={sectionRef}>
                <div className={styles.stickyWrapper}>
                    <p>Gracias</p>
                    <div className={styles.horizontalTrack} ref={trackRef}>
                        <img src={img1} alt="Recap 1" className={styles.recapImage} />
                        <img src={img2} alt="Recap 2" className={styles.recapImage} />
                        <img src={img3} alt="Recap 3" className={styles.recapImage} />
                    </div>
                </div>
            </div>
        </section>
    )
}