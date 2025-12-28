import { useEffect, useRef, useState } from 'react'
import styles from './Final.module.css'
import curtainImg from '../../assets/curtain.webp'
import circleImg from '../../assets/circle.webp'
import fireworksImg from '../../assets/fireworks.webp'
import starImg from '../../assets/star.webp'
import { Typewriter } from '../../components/Typewriter/Typewriter'
import { useAsset } from '../../context/AssetContext'
import { useUI } from '../../context/UIContext'

export const Final = () => {
    const { setLocked } = useUI()
    const [count, setCount] = useState(10)
    const [hasStarted, setHasStarted] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const sectionRef = useRef(null)

    const preloadedCurtain = useAsset(curtainImg)
    const preloadedCircle = useAsset(circleImg)
    const preloadedFireworks = useAsset(fireworksImg)
    const preloadedStar = useAsset(starImg)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true)
                }
            },
            { threshold: 0.5 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!hasStarted) return

        if (count > 1) {
            const timer = setTimeout(() => {
                setCount((prev) => prev - 1)
            }, 1000)
            return () => clearTimeout(timer)
        } else if (count === 1) {
            const timer = setTimeout(() => {
                setShowContent(true)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [count, hasStarted])

    useEffect(() => {
        if (hasStarted) {
            setLocked(true)
        }
    }, [hasStarted, setLocked])

    useEffect(() => {
        if (showContent) {
            // Total duration: last typewriter starts at 4600ms + 800ms duration = 5400ms
            const timer = setTimeout(() => {
                setLocked(false)
            }, 6000)
            return () => clearTimeout(timer)
        }
    }, [showContent, setLocked])

    return (
        <div className={styles.final} id="final" ref={sectionRef}>
            {showContent && (
                <>
                    <img src={preloadedCurtain} alt="" className={`${styles.curtain} ${styles.curtainLeft}`} />
                    <img src={preloadedCurtain} alt="" className={`${styles.curtain} ${styles.curtainRight}`} />
                    {/* Scattered stars */}
                    <img src={preloadedStar} alt="" className={styles.finalStar} />
                    <img src={preloadedStar} alt="" className={styles.finalStar} />
                    <img src={preloadedStar} alt="" className={styles.finalStar} />
                    <img src={preloadedStar} alt="" className={styles.finalStar} />
                    <img src={preloadedStar} alt="" className={styles.finalStar} />
                    <img src={preloadedStar} alt="" className={styles.finalStar} />
                    <img src={preloadedStar} alt="" className={styles.finalStar} />
                </>
            )}
            <div className={styles.content}>
                {!showContent ? (
                    <div key={count} className={styles.number}>
                        {count}
                    </div>
                ) : (
                    <div className={styles.messageOnEnd}>
                        <img src={preloadedCircle} alt="" className={styles.decorativeCircle} />
                        <h3>
                            <Typewriter text="FELIZ" duration={500} delay={0} />
                        </h3>
                        <h2>
                            <Typewriter text="2026" duration={800} delay={500} />
                        </h2>
                        <p>
                            <Typewriter text="Por un año con más recuerdos a tu lado." duration={1500} delay={1300} />
                        </p>
                    </div>
                )}
            </div>
            {showContent && (
                <>
                    <img src={preloadedFireworks} alt="" className={`${styles.fireworks} ${styles.fireworksLeft}`} />
                    <img src={preloadedFireworks} alt="" className={`${styles.fireworks} ${styles.fireworksRight}`} />
                    <div className={styles.dedication}>
                        <p>
                            <Typewriter text="Para Alita," duration={800} delay={3000} />
                        </p>
                        <p>
                            <Typewriter text="con cariño" duration={800} delay={3800} />
                        </p>
                        <p>
                            <Typewriter text="-Estefano." duration={800} delay={4600} />
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}