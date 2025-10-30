import { MusicPlayerProvider } from '@/providers/MusicPlayerProvider'
import MusicPlayerSection from './MusicPlayerSection'
import PlaylistSection from './PlaylistSection'

const InventoryPlayer = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 md:p-6 mb-6">
      <MusicPlayerProvider>
        <MusicPlayerSection />
        <PlaylistSection />
      </MusicPlayerProvider>
    </div>
  )
}

export default InventoryPlayer
