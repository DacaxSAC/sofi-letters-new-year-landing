import styles from './Hero.module.css'
import { Typewriter } from '../../components'
import paper from '../../assets/paper.webp'
import tape from '../../assets/tape.webp'

import { useAsset } from '../../context/AssetContext'

export const Hero = () => {
    const preloadedPaper = useAsset(paper)
    const preloadedTape = useAsset(tape)

    return (
        <div className={styles.hero} id="hero">
            <section className={styles.textContainer}>
                <div className={styles.paperWrapper}>
                    <img src={preloadedTape} alt="" className={styles.tape} />
                    <img src={preloadedPaper} alt="" className={styles.paper} />
                    <div className={styles.content}>
                        <Typewriter
                            className={styles.typewriter}
                            text="Sofi"
                            delay={0}
                            duration={1000}
                        />
                        <Typewriter
                            className={styles.typewriter}
                            text="ANTES DE EMPEZAR UN NUEVO AÑO, QUIERO DECIRTE..."
                            delay={1000}
                            duration={3000}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}