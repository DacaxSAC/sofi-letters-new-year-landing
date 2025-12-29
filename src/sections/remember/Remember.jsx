import { useEffect, useRef, useState } from 'react'
import styles from './Remember.module.css'
import balloons from '../../assets/balloons.webp'
import { Typewriter } from '../../components'
import { useAsset } from '../../context/AssetContext'

export const Remember = () => {
    const preloadedBallonsImg = useAsset(balloons)
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.8 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div
            className={`${styles.remember} ${isVisible ? styles.visible : ''}`}
            id="remember"
            ref={sectionRef}
        >
            <img src={preloadedBallonsImg} alt="Balloons Left" className={styles.balloonsLeft} />
            <img src={preloadedBallonsImg} alt="Balloons Right" className={styles.balloonsRight} />
            <div className={styles.textContainer}>
                {isVisible && (
                    <Typewriter
                        className={styles.typewriter}
                        text="Gracias por llegar a mi vida y hacerla más bonita, más tranquila y más real. Este año me enseñó que contigo todo se siente mejor, incluso los días difíciles. Deseo que el nuevo año nos siga encontrando juntos, creciendo, aprendiendo y eligiéndonos con el mismo amor de siempre."
                        delay={2500}
                        duration={3000}
                    />
                )}
            </div>
        </div>
    )
}