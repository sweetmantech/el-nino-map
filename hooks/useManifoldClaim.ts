import { CHAIN, CHAIN_ID, WALLET_STATUS } from '@/lib/consts'
import handleTxError from '@/lib/handleTxError'
import { useSwitchActiveWalletChain } from 'thirdweb/react'
import useClaimInfo from './useClaimInfo'
import usePrepareClaim from './usePrepareClaim'
import useUsdcClaim from './useUsdcClaim'
import useETHClaim from './useETHClaim'
import { useSwitchChain } from 'wagmi'
import { useFrameProvider } from '@/providers/FrameProvider'
import { useRouter } from 'next/navigation'

export enum CLAIM_ERRORS {
  INSUFFICIENT_BALANCE,
  TX_REJECTED,
  NO_ERROR,
}
const useManifoldClaim = () => {
  const switchChain = useSwitchActiveWalletChain()
  const { switchChainAsync } = useSwitchChain()
  const claimInfo = useClaimInfo()
  const { isPrepared } = usePrepareClaim()
  const { claimWithUsdc } = useUsdcClaim()
  const { claimWithETH } = useETHClaim()
  const { context } = useFrameProvider()
  const { push } = useRouter()

  const claim = async () => {
    try {
      if (context) await switchChainAsync({ chainId: CHAIN_ID })
      else await switchChain(CHAIN)
      const isPreparedClaim = await isPrepared(claimInfo)
      if (isPreparedClaim === WALLET_STATUS.INSUFFICIENT_BALANCE)
        return { error: CLAIM_ERRORS.INSUFFICIENT_BALANCE }
      if (isPreparedClaim === WALLET_STATUS.ENOUGH_USDC) await claimWithUsdc(claimInfo)
      if (isPreparedClaim === WALLET_STATUS.ENOUGH_ETH) await claimWithETH(claimInfo)

      push('/inventory')
      return {
        error: CLAIM_ERRORS.NO_ERROR,
      }
    } catch (error) {
      handleTxError(error)
      return { error: CLAIM_ERRORS.TX_REJECTED }
    }
  }

  return {
    claim,
    ...claimInfo,
  }
}

export default useManifoldClaim
