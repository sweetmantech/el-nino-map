import { useEffect, useState } from 'react'
import { CrossmintEmbeddedCheckout, useCrossmintCheckout } from '@crossmint/client-sdk-react-ui'
import { useActiveAccount } from 'thirdweb/react'
import Modal from '../Modal'
import { Address, formatEther, formatUnits, parseUnits } from 'viem'
import { toast } from 'react-toastify'
import { CHAIN_ID, SUBSCRIPTION, SUBSCRIPTION_CROSSMINT_COLLECTION_ID } from '@/lib/consts'
import {
  QUOTER_ADDRESSES,
  SWAP_ROUTER_02_ADDRESSES,
  V3_CORE_FACTORY_ADDRESSES,
} from '@uniswap/sdk-core'
import { WETH_TOKEN } from '@/lib/tokens'
import { FeeAmount } from '@uniswap/v3-sdk'
import { useSubscriptionInfoProvider } from '@/providers/SubscriptionProvider'
import getPoolInfo from '@/lib/getPoolInfo'

const FiatSubscribeModal = ({ onClose }: { onClose: () => void }) => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address
  const { order } = useCrossmintCheckout()
  const { pricePerPeriod, initPrice, balanceOf, decimals } = useSubscriptionInfoProvider()
  const [amountIn, setAmountIn] = useState<bigint>(BigInt(0))
  useEffect(() => {
    const fetchOrder = async () => {
      if (order?.phase !== 'completed') return
      toast.success('Subscribed!')
      window.open('https://hypersub.xyz/s/enm-lb6jxqtldv5s', '_blank')
    }
    fetchOrder()
    // eslint-disable-next-line
  }, [order])

  useEffect(() => {
    const getAmountIn = async () => {
      const { amountInMaximum } = await getPoolInfo(
        activeAccount.address,
        parseUnits('1.1', decimals),
      )
      setAmountIn(amountInMaximum)
    }

    if (address) getAmountIn()
    // eslint-disable-next-line
  }, [address])

  return (
    <Modal onClose={onClose}>
      <div className="max-w-[450px] px-6 py-3 bg-white rounded-md" id="credit-card-crossmint">
        {address && amountIn > BigInt(0) && (
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator: `crossmint:${SUBSCRIPTION_CROSSMINT_COLLECTION_ID}`,
              callData: {
                swapData: {
                  swapFactory: V3_CORE_FACTORY_ADDRESSES[CHAIN_ID],
                  swapRouter: SWAP_ROUTER_02_ADDRESSES(CHAIN_ID),
                  quoterV2: QUOTER_ADDRESSES[CHAIN_ID],
                  tokenIn: WETH_TOKEN.address,
                  fee: FeeAmount.LOW,
                },
                subscription: SUBSCRIPTION,
                tierId: 1,
                to: address,
                totalPrice: formatEther(
                  amountIn *
                    BigInt(
                      formatUnits(
                        balanceOf > 0 ? pricePerPeriod : initPrice + pricePerPeriod,
                        decimals,
                      ),
                    ),
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

export default FiatSubscribeModal
