import { useEffect } from 'react'
import { CrossmintEmbeddedCheckout, useCrossmintCheckout } from '@crossmint/client-sdk-react-ui'
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
              collectionLocator: 'crossmint:f9327881-751d-4adf-a7a1-3eebc7b52a50',
              callData: {
                creatorContractAddress: '0x9875a02597614f2903bd84D5A3Ad6AaaA01dF541',
                mintIndex: '0',
                merkleProof: '[]',
                totalPrice: '0.0005',
                instanceId: '4262256880',
              },
            }}
            payment={{
              crypto: { enabled: true },
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
