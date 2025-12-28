import styles from './Hero.module.css'
import { Typewriter, Snowfall } from '../../components'
import confettiImg from '../../assets/confetti.webp'
import decorationsImg from '../../assets/decorations.webp'
import starImg from '../../assets/star.webp'
import { useAsset } from '../../context/AssetContext'

export const Hero = () => {
    const preloadedConfetti = useAsset(confettiImg)
    const preloadedDecorations = useAsset(decorationsImg)
    const preloadedStar = useAsset(starImg)

    return (
        <div className={styles.hero} id="hero">
            <Snowfall />
            <section className={styles.header}>
                <img src={preloadedConfetti} alt="" className={styles.confetti} />
                <img src={preloadedDecorations} alt="" className={styles.decorations} />
                {[...Array(7)].map((_, i) => (
                    <img key={i} src={preloadedStar} alt="" className={styles.heroStar} />
                ))}
            </section>
            <section className={styles.textContainer}>
                <Typewriter
                    className={styles.typewriter}
                    text="ANTES DE EMPEZAR UN NUEVO AÑO, QUIERO DECIRTE..."
                    delay={1000}
                    duration={3000}
                />
            </section>
        </div>
    )
}