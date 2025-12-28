import styles from './Recap.module.css'
import video from '../../assets/recap.mp4'
import { useAsset } from '../../context/AssetContext'

export const Recap = () => {
    const videoSrc = useAsset(video)

    return (
        <div className={styles.recap} id="recap">
            <video src={videoSrc} autoPlay loop muted playsInline />
        </div>
    )
}