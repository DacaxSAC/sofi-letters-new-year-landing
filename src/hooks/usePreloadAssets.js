import { useEffect, useState } from 'react'

export function usePreloadAssets(assetUrls) {
    const [loadedCount, setLoadedCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [preloadedAssets, setPreloadedAssets] = useState({})

    useEffect(() => {
        if (assetUrls.length === 0) {
            console.log('No assets to preload')
            setLoading(false)
            return
        }

        console.log(`Starting to force-fetch ${assetUrls.length} assets...`)
        let isMounted = true
        let count = 0
        const assetMap = {}

        const downloadAsset = async (url, index) => {
            try {
                const response = await fetch(url)
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

                // Reading as blob forces the browser to download the entire response body
                // and store it in the browser's HTTP cache.
                const blob = await response.blob()

                // Create an ObjectURL to reference the blob in memory directly
                const objectUrl = URL.createObjectURL(blob)
                assetMap[url] = objectUrl

                console.log(`✓ Asset Downloaded (${index + 1}/${assetUrls.length}):`, url)
                return true
            } catch (error) {
                console.warn(`✗ Asset Download Failed (${index + 1}/${assetUrls.length}):`, url, error)
                return false
            }
        }

        const loadAllAssets = async () => {
            // Load in parallel cohorts (max 6 at a time to be browser-friendly)
            const batchSize = 6
            for (let i = 0; i < assetUrls.length; i += batchSize) {
                if (!isMounted) break

                const batch = assetUrls.slice(i, i + batchSize)
                await Promise.all(batch.map((url, batchIdx) =>
                    downloadAsset(url, i + batchIdx).then(() => {
                        if (isMounted) {
                            count++
                            setLoadedCount(count)
                        }
                    })
                ))
            }

            if (isMounted) {
                console.log(`✓ All ${assetUrls.length} assets force-downloaded to cache!`)
                setPreloadedAssets({ ...assetMap })
                // Small artificial delay to ensure UI transition is smooth
                setTimeout(() => {
                    if (isMounted) setLoading(false)
                }, 800)
            }
        }

        loadAllAssets()

        return () => {
            isMounted = false
            // Cleanup ObjectURLs to avoid memory leaks
            Object.values(assetMap).forEach(url => URL.revokeObjectURL(url))
        }
    }, [assetUrls])

    const progress = assetUrls.length > 0 ? Math.round((loadedCount / assetUrls.length) * 100) : 100

    return { loading, progress, preloadedAssets }
}
