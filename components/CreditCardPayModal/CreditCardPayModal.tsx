import { useEffect } from 'react'
import { CrossmintEmbeddedCheckout, useCrossmintCheckout } from '@crossmint/client-sdk-react-ui'
import { DROP_ADDRESS, INSTANCE_ID } from '../../lib/consts'
import { useActiveAccount } from 'thirdweb/react'
import Modal from '../Modal'
import { Address } from 'viem'
import { toast } from 'react-toastify'

const CreditCardPayModal = ({ onClose }: { onClose: () => void }) => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address
  const { order } = useCrossmintCheckout()

  useEffect(() => {
    const fetchOrder = async () => {
      if (order?.phase !== 'completed') return
      toast.success('Purchased!')
    }
    fetchOrder()
    // eslint-disable-next-line
  }, [order])

  return (
    <Modal onClose={onClose}>
      <div className="max-w-[450px] px-6 py-3 bg-white rounded-md" id="credit-card-crossmint">
        {address && (
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator: 'crossmint:c8e93456-aa08-4f03-85d3-1aed3ae668f6',
              callData: {
                totalPrice: '0.0005',
                creatorContractAddress: DROP_ADDRESS,
                instanceId: INSTANCE_ID.toString(),
                mintIndex: 0,
                merkleProof: '[]',
                mintFor: address,
              },
            }}
            payment={{
              crypto: { enabled: false },
              fiat: {
                enabled: true,
                defaultCurrency: 'usd',
              },
            }}
            recipient={{ walletAddress: address as Address }}
          />
        )}
      </div>
    </Modal>
  )
}

export default CreditCardPayModal
