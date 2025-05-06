import { useMapProvider } from '@/providers/MapProvider'
import Hypersub from '../Hypersub'
import MemoriesModal from '../MemoriesModal'
import SpinampPlayer from './SpinampPlayer'
import Leaderboard from '../Leaderboard'
import Metadata from '../Metadata'
import Video from '../Video'
import DraggableModal from '../DraggableModal'
import SMS from '../SMS'
import ComingSoon from '../ComingSoon'
import dynamic from 'next/dynamic'
import { usePurchaseProvider } from '@/providers/PurchaseProvider'

const CreditCardPayModal = dynamic(() => import('@/components/CreditCardPayModal'), {
  loading: () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">Loading payment options...</div>
    </div>
  ),
  ssr: false,
})

const Modals = () => {
  const {
    isHypersubOpen,
    setIsHypersubOpen,
    isMemoriesOpen,
    setIsMemoriesOpen,
    isSpinampOpen,
    isLeaderboardOpen,
    setIsLeaderboardOpen,
    isMetadataOpen,
    setIsMetadataOpen,
    isVideoOpen,
    setIsVideoOpen,
    setIsSpinampOpen,
    isComingSoonOpen,
    setIsComingSoonOpen,
  } = useMapProvider()
  const { isCrossmintOpen, setIsCrossmintOpen } = usePurchaseProvider()

  return (
    <>
      {isCrossmintOpen && <CreditCardPayModal onClose={() => setIsCrossmintOpen(false)} />}
      {isHypersubOpen && <Hypersub onClose={() => setIsHypersubOpen(false)} />}
      {isMemoriesOpen && <MemoriesModal onClose={() => setIsMemoriesOpen(false)} />}
      {isSpinampOpen && (
        <DraggableModal handleClose={() => setIsSpinampOpen(!isSpinampOpen)}>
          <SpinampPlayer />
        </DraggableModal>
      )}
      {isLeaderboardOpen && (
        <Leaderboard onClose={() => setIsLeaderboardOpen(!isLeaderboardOpen)} />
      )}
      {isMetadataOpen && <Metadata onClose={() => setIsMetadataOpen(!isMetadataOpen)} />}
      {isVideoOpen && <Video onClose={() => setIsVideoOpen(!isVideoOpen)} />}
      <SMS />
      {isComingSoonOpen && <ComingSoon onClose={() => setIsComingSoonOpen(!isComingSoonOpen)} />}
    </>
  )
}

export default Modals
