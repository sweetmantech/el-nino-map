import { CrossmintPaymentElement } from '@crossmint/client-sdk-react-ui'

const CreditCardPayModal = ({ onClose }: { onClose: () => void }) => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string

  return (
    <div
      className="absolute left-0 top-0 w-full h-full z-[15]
      flex items-center justify-center"
      onClick={(e: any) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="max-w-[300px] p-3 bg-white rounded-md" id="credit-card-crossmint">
        <CrossmintPaymentElement
          projectId={projectId}
          collectionId={collectionId}
          environment={environment}
          emailInputOptions={{
            show: true,
          }}
          paymentMethod="fiat"
          mintConfig={{
            totalPrice: '0.000777',
          }}
        />
      </div>
    </div>
  )
}

export default CreditCardPayModal
