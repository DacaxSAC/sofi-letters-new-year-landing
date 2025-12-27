import styles from './Remember.module.css'
import starImg from '../../assets/star.webp'
import rememberImg from '../../assets/remember.webp'
import { Typewriter } from '../../components'

export const Remember = () => {
    return (
        <div className={styles.remember} id="remember">
            <div className={styles.starsContainer}>
                {[...Array(7)].map((_, i) => (
                    <img key={i} src={starImg} alt="" className={styles.star} style={{ '--i': i }} />
                ))}
            </div>
            <div className={styles.imageContainer}>
                <img src={rememberImg} alt="Remember" className={styles.rememberImage} />
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