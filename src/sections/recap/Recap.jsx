import { useEffect, useRef } from 'react'
import styles from './Recap.module.css'
import video from '../../assets/recap.mp4'
import { useAsset } from '../../context/AssetContext'

export const Recap = () => {
    const videoSrc = useAsset(video)
    const sectionRef = useRef(null)
    const videoRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(err => {
                            console.warn("Video playback failed:", err)
                        })
                    } else {
                        videoRef.current.pause()
                    }
                }
            },
            { threshold: 0.8 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div className={styles.recap} id="recap" ref={sectionRef}>
            <video
                ref={videoRef}
                src={videoSrc}
                loop
                muted
                playsInline
            />
        </div>
    )
}