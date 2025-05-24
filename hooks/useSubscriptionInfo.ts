import { currencyContract, subscriptionContract } from '@/lib/contracts'
import { useFrameProvider } from '@/providers/FrameProvider'
import { useEffect, useState } from 'react'
import { readContract } from 'thirdweb'
import { useActiveAccount } from 'thirdweb/react'
import { useAccount } from 'wagmi'

const useSubscriptionInfo = () => {
  const { context } = useFrameProvider()
  const activeAccount = useActiveAccount()
  const { address } = useAccount()
  const account = context ? address : activeAccount?.address

  const [symbol, setSymbol] = useState<string>('')
  const [pricePerPeriod, setPricePerPeriod] = useState<bigint>(BigInt(0))
  const [initPrice, setInitPrice] = useState<bigint>(BigInt(0))
  const [decimals, setDecimals] = useState<number>(0)
  const tierId = 1
  const [balanceOf, setBalanceOf] = useState<number>(0)
  const [currency, setCurrency] = useState<string>('')

  useEffect(() => {
    const init = async () => {
      const contractDetail = await readContract({
        contract: subscriptionContract as any,
        method:
          'function contractDetail() view returns ((uint16 tierCount, uint64 subCount, uint64 supplyCap, address transferRecipient, address currency, uint256 creatorBalance, uint8 numCurves, uint256 rewardShares, uint256 rewardBalance, uint32 rewardSlashGracePeriod, bool rewardSlashable) detail)',
        params: [],
      })

      const currency = contractDetail.currency
      setCurrency(currency)
      const symbol = await readContract({
        contract: currencyContract(currency) as any,
        method: 'function symbol() view returns (string)',
        params: [],
      })
      setSymbol(symbol)
      const decimals = await readContract({
        contract: currencyContract(currency) as any,
        method: 'function decimals() view returns (uint8)',
        params: [],
      })
      setDecimals(decimals)
      const tierDetail = await readContract({
        contract: subscriptionContract as any,
        method:
          'function tierDetail(uint16 tierId) view returns ((uint32 subCount, uint16 id, (uint32 periodDurationSeconds, uint32 maxSupply, uint48 maxCommitmentSeconds, uint48 startTimestamp, uint48 endTimestamp, uint8 rewardCurveId, uint16 rewardBasisPoints, bool paused, bool transferrable, uint256 initialMintPrice, uint256 pricePerPeriod, (uint8 gateType, address contractAddress, uint256 componentId, uint256 balanceMin) gate) params) tier)',
        params: [tierId],
      })
      setPricePerPeriod(BigInt(tierDetail.params.pricePerPeriod))
      setInitPrice(BigInt(tierDetail.params.initialMintPrice))
    }

    init()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const getBalanceOf = async () => {
      const balanceOf = await readContract({
        contract: subscriptionContract,
        method: 'function balanceOf(address account) view returns (uint256 numSeconds)',
        params: [account],
      })
      setBalanceOf(parseInt(balanceOf.toString(), 10))
    }
    if (account) getBalanceOf()
  }, [account])

  return {
    symbol,
    pricePerPeriod,
    balanceOf,
    initPrice,
    decimals,
    currency,
  }
}

export default useSubscriptionInfo
