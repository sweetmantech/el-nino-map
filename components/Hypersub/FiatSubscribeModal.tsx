import Modal from '../Modal'
import { X } from 'lucide-react'

const FiatSubscribeModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <div className="max-w-[450px] px-6 py-3 bg-white rounded-md" id="fiat-subscribe-crossmint">
        <button
          type="button"
          onClick={onClose}
          className="text-xl absolute right-4 top-2 text-black font-akira"
        >
          <X className="size-4" />
        </button>
        <p className="font-akira text-xl pb-1">Coming Soon !</p>
        <p className="font-titilliumweb text-lg py-1">
          {`Insufficient funds in wallet to subscribe.`}
        </p>
        <p className="font-titilliumweb text-grey pb-1">
          {`We're cooking credit card subscription feature.`}
        </p>
        <button
          className="bg-black text-white w-full py-2 mt-2 rounded-md font-titilliumweb text-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default FiatSubscribeModal
