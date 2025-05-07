import { usePurchaseProvider } from '@/providers/PurchaseProvider'
import { useTipProvider } from '@/providers/TipProvider'
import Image from 'next/image'
import { Fragment, ReactNode } from 'react'
import { formatEther, formatUnits } from 'viem'
import { Skeleton } from '../ui/skeleton'
import { MANIFOLD_FEE } from '@/lib/consts'
import useIsMobile from '@/hooks/useIsMobile'
import Modal from '../Modal'

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
  const { tooltipId } = useTipProvider()
  const {
    mint,
    purchasing,
    amount,
    setAmount,
    symbol,
    price,
    decimal,
    isLoading,
    metadata,
    isOpenCollect,
  } = usePurchaseProvider()
  const isMobile = useIsMobile()

  if (tooltipId !== 'mint') return <Fragment />
  if (isMobile && !isOpenCollect) return <Fragment />

  return (
    <PreviewContainer>
      <main className="bg-white p-2 rounded-md flex flex-col items-center">
        <div className="w-[200px] aspect-[1/1] relative">
          {metadata?.image ? (
            <Image
              src={metadata.image}
              alt="not found preview"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          ) : (
            <Skeleton className="size-full" />
          )}
        </div>
        <div className="mt-2 px-2 w-full">
          <p className="font-titilliumweb">{metadata?.name || ''}</p>
          {isLoading ? (
            <Skeleton className="w-12 h-5" />
          ) : (
            <p className="font-titilliumweb">
              {formatUnits(price * BigInt(amount), decimal)} {price > BigInt(0) && symbol}
            </p>
          )}
          <p className="font-titilliumweb">{`+ MANIFOLD FEE (${formatEther(MANIFOLD_FEE * BigInt(amount))} ETH)`}</p>
        </div>
        <div className="flex font-titilliumweb justify-center gap-2 mt-1">
          <button
            className="bg-black text-white px-3 rounded-sm"
            onClick={() => {
              if (amount > 1) setAmount(amount - 1)
            }}
          >
            -
          </button>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            className="!ring-0 !outline-none !w-fit px-2 text-center"
          />
          <button
            className="bg-black text-white px-3 rounded-sm"
            onClick={() => setAmount(amount + 1)}
          >
            +
          </button>
        </div>
        <button
          disabled={purchasing}
          type="button"
          onClick={mint}
          className="w-full py-2 mt-2 bg-black rounded-md text-white font-titilliumweb"
        >
          {purchasing ? 'Collecting...' : 'Collect'}
        </button>
      </main>
    </PreviewContainer>
  )
}

export default Preview
