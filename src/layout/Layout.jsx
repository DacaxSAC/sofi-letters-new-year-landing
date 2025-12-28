import styles from './Layout.module.css'

import { Hero, Remember, Recap, Final, Footer } from '../sections'
import { ScrollReminder } from '../components'

export const Layout = () => {

    return (
        <div className={styles.layout} id="layout">
            <main>
                <Hero />
                <Remember />
                <Recap />
                <Final />
                <Footer />
                <ScrollReminder />
            </main>
        </div>
    )
}