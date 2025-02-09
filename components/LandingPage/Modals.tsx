import { useMapProvider } from '@/providers/MapProvider'
import CreditCardPayModal from '../CreditCardPayModal'
import GuestBook from '../GuestBook'
import Hypersub from '../Hypersub'
import MemoriesModal from '../MemoriesModal'
import SpinampPlayer from './SpinampPlayer'
import Leaderboard from '../Leaderboard'
import Metadata from '../Metadata'
import Video from '../Video'
import DraggableModal from '../DraggableModal'
import SMS from '../SMS'
import ComingSoon from '../ComingSoon'

const Modals = () => {
  const {
    isCrossmintOpen,
    setIsCrossmintOpen,
    isHypersubOpen,
    setIsHypersubOpen,
    isGuestbookOpen,
    setIsGuestbookOpen,
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
    isPlannetOpen,
    setIsPlannetOpen,
    isComingSoonOpen,
    setIsComingSoonOpen,
  } = useMapProvider()

  return (
    <>
      {isCrossmintOpen && <CreditCardPayModal onClose={() => setIsCrossmintOpen(false)} />}
      {isGuestbookOpen && <GuestBook onClose={() => setIsGuestbookOpen(false)} />}
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
      {isPlannetOpen && <SMS onClose={() => setIsPlannetOpen(!isPlannetOpen)} />}
      {isComingSoonOpen && <ComingSoon onClose={() => setIsComingSoonOpen(!isComingSoonOpen)} />}
    </>
  )
}

export default Modals
