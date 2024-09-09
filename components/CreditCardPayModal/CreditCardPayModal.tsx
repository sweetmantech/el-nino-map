import { CrossmintPaymentElement } from '@crossmint/client-sdk-react-ui'
import { COMMENT, MINT_REFERRAL } from '../../lib/consts'
import { useActiveAccount } from 'thirdweb/react'

const CreditCardPayModal = ({ onClose }: { onClose: () => void }) => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address

  return (
    <div
      className="absolute left-0 top-0 w-full h-full z-[15]
      flex items-center justify-center"
      onClick={(e: any) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
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
              totalPrice: '0.000777',
              quantity: 1,
              comment: COMMENT,
              mintReferral: MINT_REFERRAL,
            }}
            recipient={{
              wallet: address,
            }}
          />
        )}
      </div>
    </div>
  )
}

export default CreditCardPayModal
