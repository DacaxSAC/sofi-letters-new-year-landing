import styles from './Layout.module.css'

import { Hero, Remember, Recap, Final } from '../sections'
import { ScrollReminder } from '../components'

export const Layout = () => {
    return (
        <div className={styles.layout} id="layout">
            <main>
                <Hero />
                <Remember />
                <Recap />
                <Final />
                <ScrollReminder />
            </main>
        </div>
    )
}