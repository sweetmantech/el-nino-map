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
        className="max-w-[584px] min-w-[400px] p-3 bg-white rounded-md flex-col flex gap-2"
        id="subscribe"
      >
        <p className="text-xl font-bold text-center font-italipixel">Subscription</p>
        {photos.map((photo) => (
          <div className="w-[80px] aspect-[1/1] relative z-[10]" key={photo}>
            <Image src={photo} layout="fill" className="absolute object-fit" alt="" />
          </div>
        ))}
        <p>
          Subscribe to ENM by La Equis $5 USDC/month for exclusive content, early access & surprise
          drops.
        </p>
        <button
          type="button"
          className="border-[1px] border-black rounded-md font-semibold py-1"
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
