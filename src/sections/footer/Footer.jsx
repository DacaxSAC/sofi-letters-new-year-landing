import { useEffect, useRef, useState } from 'react'
import styles from './Footer.module.css'
import logoImg from '../../assets/logo.webp'
import { Typewriter } from '../../components/Typewriter/Typewriter'

export const Footer = () => {
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
        <div className={styles.footer} id="footer" ref={sectionRef}>
            <div className={styles.content}>
                <h2 className={styles.madeBy}>
                    {isVisible && <Typewriter text="Hecho por Sofi Letters" duration={2000} delay={0} />}
                </h2>
                <img
                    src={logoImg}
                    alt="Logo"
                    className={`${styles.logo} ${isVisible ? styles.visible : ''}`}
                />
            </div>
        </div>
    )
}
