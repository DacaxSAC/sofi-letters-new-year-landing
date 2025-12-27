import styles from './Recap.module.css'
import video from '../../assets/recap.mp4'

export const Recap = () => {
    return (
        <div className={styles.recap} id="recap">
            <video src={video} autoPlay loop muted />
        </div>
    )
}