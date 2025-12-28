import { useEffect, useRef, useState } from 'react'
import styles from './Remember.module.css'
import starImg from '../../assets/star.webp'
import rememberImg from '../../assets/remember.webp'
import { Typewriter } from '../../components'
import { useAsset } from '../../context/AssetContext'

export const Remember = () => {
    const preloadedRememberImg = useAsset(rememberImg)
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
            <div className={styles.starsContainer}>
                {[...Array(7)].map((_, i) => (
                    <div key={i} className={styles.starWrapper}>
                        <img src={starImg} alt="" className={styles.star} />
                    </div>
                ))}
            </div>
            <div className={styles.imageContainer}>
                <img src={preloadedRememberImg} alt="Remember" className={styles.rememberImage} />
            </div>
            <div className={styles.textContainer}>
                {isVisible && (
                    <Typewriter
                        className={styles.typewriter}
                        text="Gracias por ser parte de mi 2025"
                        delay={2500}
                        duration={3000}
                    />
                )}
            </div>
        </div>
    )
}