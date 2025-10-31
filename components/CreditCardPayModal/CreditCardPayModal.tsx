import { useEffect } from 'react'
import { CrossmintEmbeddedCheckout, useCrossmintCheckout } from '@crossmint/client-sdk-react-ui'
import { useActiveAccount } from 'thirdweb/react'
import Modal from '../Modal'
import { Address, formatEther } from 'viem'
import {
  CHAIN_ID,
  CROSSMINT_COLLECTION_ID,
  DROP_ADDRESS,
  ERC1155_LAZY_PAYABLE_CLAIM,
  MANIFOLD_FEE,
  FALLBACK_WRAPPER_SWAP_AMOUNT,
} from '@/lib/consts'
import { usePurchaseProvider } from '@/providers/PurchaseProvider'
import {
  QUOTER_ADDRESSES,
  SWAP_ROUTER_02_ADDRESSES,
  V3_CORE_FACTORY_ADDRESSES,
} from '@uniswap/sdk-core'
import { WETH_TOKEN } from '@/lib/tokens'
import { FeeAmount } from '@uniswap/v3-sdk'
import { useRouter } from 'next/navigation'

const CreditCardPayModal = ({ onClose }: { onClose: () => void }) => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address
  const { order } = useCrossmintCheckout()
  const { amount, instanceId, erc20Address } = usePurchaseProvider()
  const { push } = useRouter()
  useEffect(() => {
    const fetchOrder = async () => {
      if (order?.phase !== 'completed') return
      push('/inventory')
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
              collectionLocator: `crossmint:${CROSSMINT_COLLECTION_ID}`,
              callData: {
                swapData: {
                  swapFactory: V3_CORE_FACTORY_ADDRESSES[CHAIN_ID],
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
                totalPrice: formatEther(
                  MANIFOLD_FEE * BigInt(amount) +
                    (erc20Address ? FALLBACK_WRAPPER_SWAP_AMOUNT * BigInt(amount) : BigInt(0)),
                ),
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
