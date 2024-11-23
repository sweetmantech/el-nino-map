import { CrossmintPaymentElement } from '@crossmint/client-sdk-react-ui'
import { COMMENT, DROP_ADDRESS, MINT_REFERRAL } from '../../lib/consts'
import { useActiveAccount } from 'thirdweb/react'
import { toast } from 'react-toastify'
import Modal from '../Modal'

const CreditCardPayModal = ({ onClose }: { onClose: () => void }) => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address

  const handlePayment = (event: any) => {
    if (event.type === 'payment:process.succeeded') {
      onClose()
      toast.success('Purchased!')
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="max-w-[300px] p-3 bg-white rounded-md" id="credit-card-crossmint">
        {address && (
          <CrossmintPaymentElement
            projectId={projectId}
            collectionId={collectionId}
            environment={environment}
            emailInputOptions={{
              show: true,
            }}
            cardWalletPaymentMethods={['apple-pay', 'google-pay']}
            paymentMethod="fiat"
            mintConfig={{
              totalPrice: '0.000111',
              quantity: 1,
              collection: DROP_ADDRESS,
              tokenId: 5,
              mintReferral: MINT_REFERRAL,
              comment: COMMENT,
            }}
            recipient={{
              wallet: address,
            }}
            onEvent={handlePayment}
          />
        )}
      </div>
    </Modal>
  )
}

export default CreditCardPayModal
