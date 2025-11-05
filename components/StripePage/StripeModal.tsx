'use client'

import Modal from '../Modal'
import StripeCheckout from './StripeCheckout'

const StripeModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600">Secure checkout powered by Stripe</p>
        </div>
        <StripeCheckout />
      </div>
    </Modal>
  )
}

export default StripeModal
