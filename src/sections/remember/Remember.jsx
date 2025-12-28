import styles from './Remember.module.css'
import starImg from '../../assets/star.webp'
import rememberImg from '../../assets/remember.webp'
import { Typewriter } from '../../components'
import { useAsset } from '../../context/AssetContext'

export const Remember = () => {
    const preloadedRememberImg = useAsset(rememberImg)

    return (
        <div className={styles.remember} id="remember">
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
                <Typewriter
                    className={styles.typewriter}
                    text="Gracias por ser parte de mi 2025"
                    delay={1000}
                    duration={3000}
                />
            </div>
        </div>
    )
}