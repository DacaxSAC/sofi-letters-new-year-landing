import { Layout } from "./layout"
import { Loader } from "./components/Loader/Loader"
import { usePreloadAssets } from "./hooks/usePreloadAssets"
import { AssetProvider } from "./context/AssetContext"

// Collect all images, videos and fonts from assets folders
const assetModules = import.meta.glob(
  [
    './assets/**/*.{png,jpg,jpeg,svg,gif,webp,mp4,webm,mov,otf,ttf,woff,woff2}',
    './sections/**/assets/**/*.{png,jpg,jpeg,svg,gif,webp,mp4,webm,mov,otf,ttf,woff,woff2}',
    './components/**/assets/**/*.{png,jpg,jpeg,svg,gif,webp,mp4,webm,mov,otf,ttf,woff,woff2}',
  ],
  { eager: true, query: '?url', import: 'default' }
)

const assetUrls = Object.values(assetModules).filter(url => url)

console.log('Total assets to preload:', assetUrls.length)

function App() {
  const { loading, progress, preloadedAssets } = usePreloadAssets(assetUrls)

  if (loading) {
    return <Loader progress={progress} />
  }

  return (
    <AssetProvider preloadedAssets={preloadedAssets}>
      <Layout />
    </AssetProvider>
  )
}

export default App
