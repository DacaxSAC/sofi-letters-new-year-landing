import { createContext, useContext, useEffect, useState } from 'react'

const AssetContext = createContext({
    assets: {},
    getAsset: (url) => url
})

export const AssetProvider = ({ children, preloadedAssets = {} }) => {
    // We keep a registry of original URLs to Object URLs
    const [assets, setAssets] = useState(preloadedAssets)

    useEffect(() => {
        setAssets(preloadedAssets)
    }, [preloadedAssets])

    const getAsset = (url) => {
        // If we have a preloaded version (ObjectURL), use it
        // otherwise fallback to original URL
        return assets[url] || url
    }

    return (
        <AssetContext.Provider value={{ assets, getAsset }}>
            {children}
        </AssetContext.Provider>
    )
}

export const useAsset = (url) => {
    const { getAsset } = useContext(AssetContext)
    return getAsset(url)
}
