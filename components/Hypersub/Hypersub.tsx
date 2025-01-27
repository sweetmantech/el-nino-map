import useSubscribe from '@/hooks/useSubscribe'
import Modal from '../Modal'
import Image from 'next/image'

const Hypersub = ({ onClose }: { onClose: () => void }) => {
  const { subscribe, loading, photos } = useSubscribe()

  const handleClick = async () => {
    await subscribe()
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div
        className="max-w-[584px] min-w-[400px] px-6 py-2 bg-white rounded-md flex-col flex gap-2"
        id="subscribe"
      >
        <p className="text-xl font-bold text-center font-italipixel text-xl">Subscription</p>
        <div className="flex gap-2">
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
          Subscribe to ENM by La Equis $5 USDC/month for exclusive content, early access & surprise
          drops.
        </p>
        <button
          type="button"
          className="w-fit px-3 mx-auto my-1 border-[1px] border-grey rounded-md font-semibold py-1 font-titilliumweb"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
    </Modal>
  )
}

export default Hypersub
