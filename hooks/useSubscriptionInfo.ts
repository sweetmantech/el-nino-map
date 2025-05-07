import { stpv2Abi } from '@/lib/abi/stpv2'
import { CHAIN, SUBSCRIPTION } from '@/lib/consts'
import { client } from '@/lib/thirdweb/client'
import { useEffect, useState } from 'react'
import { Address, getContract, readContract } from 'thirdweb'
import { erc20Abi, formatUnits } from 'viem'

const useSubscriptionInfo = () => {
  const [symbol, setSymbol] = useState<string>('')
  const [pricePerPeriod, setPricePerPeriod] = useState<string>('')
  const tierId = 1

  const subscriptionContract = getContract({
    address: SUBSCRIPTION as Address,
    abi: stpv2Abi as any,
    chain: CHAIN,
    client,
  })
  useEffect(() => {
    const init = async () => {
      const contractDetail = await readContract({
        contract: subscriptionContract as any,
        method:
          'function contractDetail() view returns ((uint16 tierCount, uint64 subCount, uint64 supplyCap, address transferRecipient, address currency, uint256 creatorBalance, uint8 numCurves, uint256 rewardShares, uint256 rewardBalance, uint32 rewardSlashGracePeriod, bool rewardSlashable) detail)',
        params: [],
      })

      const currency = contractDetail.currency

      const currencyContract = getContract({
        address: currency,
        abi: erc20Abi,
        chain: CHAIN,
        client,
      })

      const symbol = await readContract({
        contract: currencyContract as any,
        method: 'function symbol() view returns (string)',
        params: [],
      })
      setSymbol(symbol)
      const decimals = await readContract({
        contract: currencyContract as any,
        method: 'function decimals() view returns (uint8)',
        params: [],
      })

      const tierDetail = await readContract({
        contract: subscriptionContract as any,
        method:
          'function tierDetail(uint16 tierId) view returns ((uint32 subCount, uint16 id, (uint32 periodDurationSeconds, uint32 maxSupply, uint48 maxCommitmentSeconds, uint48 startTimestamp, uint48 endTimestamp, uint8 rewardCurveId, uint16 rewardBasisPoints, bool paused, bool transferrable, uint256 initialMintPrice, uint256 pricePerPeriod, (uint8 gateType, address contractAddress, uint256 componentId, uint256 balanceMin) gate) params) tier)',
        params: [tierId],
      })

      setPricePerPeriod(formatUnits(BigInt(tierDetail.params.pricePerPeriod), decimals))
    }

    init()
    // eslint-disable-next-line
  }, [])

  return {
    symbol,
    pricePerPeriod,
  }
}

export default useSubscriptionInfo
