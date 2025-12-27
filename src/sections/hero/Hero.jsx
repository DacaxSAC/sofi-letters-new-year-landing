import styles from './Hero.module.css'
import { Typewriter } from '../../components'

export const Hero = () => {
    return (
        <div className={styles.hero} id="hero">
            <section className={styles.header}>
                aqui va el header
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