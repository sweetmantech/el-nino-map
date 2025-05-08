import { useEffect } from 'react'
import { CrossmintEmbeddedCheckout, useCrossmintCheckout } from '@crossmint/client-sdk-react-ui'
import { useActiveAccount } from 'thirdweb/react'
import Modal from '../Modal'
import { Address } from 'viem'
import { toast } from 'react-toastify'
import { CHAIN_ID, DROP_ADDRESS, ERC1155_LAZY_PAYABLE_CLAIM } from '@/lib/consts'
import { usePurchaseProvider } from '@/providers/PurchaseProvider'
import { QUOTER_ADDRESSES, SWAP_ROUTER_02_ADDRESSES, V2_FACTORY_ADDRESSES } from '@uniswap/sdk-core'
import { WETH_TOKEN } from '@/lib/tokens'
import { FeeAmount } from '@uniswap/v3-sdk'

const CreditCardPayModal = ({ onClose }: { onClose: () => void }) => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address
  const { order } = useCrossmintCheckout()
  const { amount, instanceId } = usePurchaseProvider()

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
              collectionLocator: 'crossmint:4e5f9aef-de17-4215-905e-4e62f1d79f6c',
              callData: {
                swapData: {
                  swapFactory: V2_FACTORY_ADDRESSES[CHAIN_ID],
                  swapRouter: SWAP_ROUTER_02_ADDRESSES(CHAIN_ID),
                  quoterV2: QUOTER_ADDRESSES[CHAIN_ID],
                  tokenIn: WETH_TOKEN.address,
                  fee: FeeAmount.LOW,
                },
                mintData: {
                  extensionContract: ERC1155_LAZY_PAYABLE_CLAIM,
                  creatorContractAddress: DROP_ADDRESS,
                  instanceId,
                  mintCount: amount,
                  mintIndices: [],
                  merkleProofs: [[]],
                },
                to: address,
                totalPRice: '0.0011',
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
