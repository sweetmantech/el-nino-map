import Modal from '../Modal'
import Image from 'next/image'
import { useSubscriptionInfoProvider } from '@/providers/SubscriptionProvider'
import useSubscribe from '@/hooks/useSubscribe'
import { formatUnits } from 'viem'
import FiatSubscribeModal from './FiatSubscribeModal'
import { useMapProvider } from '@/providers/MapProvider'

const Hypersub = ({ onClose }: { onClose: () => void }) => {
  const { pricePerPeriod, symbol, decimals } = useSubscriptionInfoProvider()
  const { subscribe, loading, photos, subscribed, fiatActive, setFiatActive } = useSubscribe()
  const { setIsHypersubOpen } = useMapProvider()

  const handleClick = async () => {
    if (subscribed) {
      window.open('https://hypersub.xyz/s/enm-lb6jxqtldv5s', '_blank')
      return
    }
    await subscribe()
  }

  if (fiatActive)
    return (
      <FiatSubscribeModal
        onClose={() => {
          setIsHypersubOpen(false)
          setFiatActive(false)
        }}
      />
    )

  return (
    <Modal onClose={onClose}>
      <div
        className="max-w-[400px] px-6 py-2 bg-white rounded-md flex-col flex gap-2"
        id="subscribe"
      >
        <p className="text-xl font-bold text-center font-italipixel text-xl">Subscription</p>
        <div className="flex gap-2 justify-center">
          {photos.map((photo) => (
            <div
              className="w-[100px] aspect-[1/1] relative z-[10] border-[2px] border-grey-light rounded-full overflow-hidden"
              key={photo}
            >
              <Image src={photo} layout="fill" className="absolute object-cover" alt="" />
            </div>
          ))}
        </div>
        <p className="font-titilliumweb">
          {subscribed
            ? `To stay up to date with your subscription, visit the hypersub`
            : `Subscribe to ENM by La Equis ${formatUnits(pricePerPeriod, decimals)} ${symbol}/month for exclusive content, early access & surprise drops.`}
        </p>
        <button
          type="button"
          className="w-fit px-3 mx-auto my-1 border-[1px] border-grey rounded-md font-semibold py-1 font-titilliumweb"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Subscribing...' : <>{subscribed ? 'View' : 'Subscribe'}</>}
        </button>
      </div>
    </Modal>
  )
}

export default Hypersub
