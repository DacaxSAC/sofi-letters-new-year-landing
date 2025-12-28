import { useState, useEffect } from 'react'
import styles from './Loader.module.css'

const MESSAGES = [
    "Cargando magia de Año Nuevo...",
    "Preparando algo especial para ti...",
    "Afinando detalles únicos...",
    "Alistando los mejores deseos...",
    "Preparando un momento inolvidable...",
    "Puliendo cada detalle...",
    "Casi listo..."
]

export const Loader = ({ progress }) => {
    const [messageIndex, setMessageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % MESSAGES.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loaderContent}>
                <div className={styles.yearText}>2026</div>
                <div className={styles.loadingText}>{MESSAGES[messageIndex]}</div>
                <div className={styles.progressBarWrapper}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className={styles.progressText}>{progress}%</div>
            </div>
        </div>
    )
}
