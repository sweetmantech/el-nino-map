import { usePurchaseProvider } from '@/providers/PurchaseProvider'
import { useTipProvider } from '@/providers/TipProvider'
import Image from 'next/image'
import { Fragment, ReactNode, useEffect } from 'react'
import { Skeleton } from '../ui/skeleton'
import useIsMobile from '@/hooks/useIsMobile'
import Modal from '../Modal'
import Icon from '../Icon'

const PreviewContainer = ({ children }: { children: ReactNode }) => {
  const { setIsOpenCollect, isOpenCollect } = usePurchaseProvider()
  const isMobile = useIsMobile()
  const { tooltipX, tooltipY } = useTipProvider()

  if (isMobile)
    return (
      <Modal onClose={() => setIsOpenCollect(false)} open={isOpenCollect}>
        {children}
      </Modal>
    )

  return (
    <div
      className="fixed z-[9999] w-screen h-screen md:size-fit flex justify-center items-center"
      style={{
        left: isMobile ? 0 : tooltipX,
        top: isMobile ? 0 : tooltipY - 350,
      }}
    >
      {children}
    </div>
  )
}

const Preview = () => {
  const { tooltipId, closeTooltip } = useTipProvider()
  const { mint, purchasing, metadata, isOpenCollect, isCrossmintOpen } = usePurchaseProvider()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isCrossmintOpen) closeTooltip()
    // eslint-disable-next-line
  }, [isCrossmintOpen])

  if (tooltipId !== 'mint' || isCrossmintOpen) return <Fragment />
  if (isMobile && !isOpenCollect) return <Fragment />

  return (
    <PreviewContainer>
      <main className="bg-gray-800 p-6 rounded-lg flex flex-col items-center relative border border-gray-700 max-w-xs mt-10">
        <div className="w-24 h-24 aspect-[1/1] relative rounded-lg overflow-hidden mb-4">
          {metadata?.image ? (
            <Image src={metadata.image} alt="NFT preview" fill className="object-cover" />
          ) : (
            <Skeleton className="size-full" />
          )}
        </div>
        <h2 className="text-white font-bold text-xl mb-2 text-center">Maravilla Pass</h2>
        <p className="text-white text-sm text-center mb-6">
          Collect this Pass to unlock premium music, videos, and interactive experiences
        </p>
        <button
          disabled={purchasing}
          type="button"
          onClick={mint}
          className="w-full py-3 bg-blue-600 rounded-lg text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50"
        >
          <Icon name="white-star" />
          <span>{purchasing ? 'Collecting...' : 'Collect Maravilla Pass'}</span>
        </button>
      </main>
    </PreviewContainer>
  )
}

export default Preview
