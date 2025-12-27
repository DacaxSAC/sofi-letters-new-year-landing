import { useEffect, useRef, useState } from 'react'
import styles from './Final.module.css'

export const Final = () => {
    const [count, setCount] = useState(10)
    const [hasStarted, setHasStarted] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const sectionRef = useRef(null)

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
            // Wait 1 second on "1" before showing content
            const timer = setTimeout(() => {
                setShowContent(true)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [count, hasStarted])

    return (
        <div className={styles.final} id="final" ref={sectionRef}>
            <div className={styles.content}>
                {!showContent ? (
                    <div key={count} className={styles.number}>
                        {count}
                    </div>
                ) : (
                    <div className={styles.messageOnEnd}>
                        {/* Aquí puedes colocar tu contenido final */}
                        <h2>FELIZ 2025</h2>
                        <p>Escribe aquí tu mensaje...</p>
                    </div>
                )}
            </div>
        </div>
    )
}