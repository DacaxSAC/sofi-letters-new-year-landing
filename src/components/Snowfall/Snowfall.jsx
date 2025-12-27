import styles from './Snowfall.module.css'
import snowflakeImg from '../../assets/snowflake.webp'

export const Snowfall = ({ count = 120 }) => {
    // Generate flakes with random properties ONCE
    const flakes = [...Array(count)].map((_, i) => ({
        id: i,
        left: Math.random() * 100 + '%',
        animationDuration: Math.random() * 5 + 5 + 's', // 5s to 10s
        animationDelay: Math.random() * 5 + 's',
    }))

    return (
        <div className={styles.snowContainer}>
            {flakes.map((flake) => (
                <img
                    key={flake.id}
                    src={snowflakeImg}
                    alt=""
                    className={styles.snowflake}
                    style={{
                        left: flake.left,
                        animationDuration: flake.animationDuration,
                        animationDelay: flake.animationDelay,
                        opacity: .5 // Apply it here as well to be 100% sure
                    }}
                />
            ))}
        </div>
    )
}
