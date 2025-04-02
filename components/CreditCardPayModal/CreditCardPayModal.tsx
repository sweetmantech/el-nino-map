import { useEffect } from 'react'
import { CrossmintEmbeddedCheckout, useCrossmintCheckout } from '@crossmint/client-sdk-react-ui'
import { COMMENT, DROP_ADDRESS, MINT_REFERRAL } from '../../lib/consts'
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
              collectionLocator: 'crossmint:22373fe5-17e4-4ac9-8682-3ba5f83ef2d4',
              callData: {
                quantity: 1,
                collection: DROP_ADDRESS,
                tokenId: 5,
                mintReferral: MINT_REFERRAL,
                totalPrice: '0.000000111',
                comment: COMMENT,
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
