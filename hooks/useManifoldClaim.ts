import { CHAIN, WALLET_STATUS } from '@/lib/consts'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import { useSwitchActiveWalletChain } from 'thirdweb/react'
import useClaimInfo from './useClaimInfo'
import usePrepareClaim from './usePrepareClaim'
import useUsdcClaim from './useUsdcClaim'
import useETHClaim from './useETHClaim'

export enum CLAIM_ERRORS {
  INSUFFICIENT_BALANCE,
  TX_REJECTED,
  NO_ERROR,
}
const useManifoldClaim = () => {
  const switchChain = useSwitchActiveWalletChain()
  const claimInfo = useClaimInfo()
  const { isPrepared } = usePrepareClaim()
  const { claimWithUsdc } = useUsdcClaim()
  const { claimWithETH } = useETHClaim()

  const claim = async (activeAccount: any) => {
    try {
      const address = activeAccount?.address
      await switchChain(CHAIN)
      const isPreparedClaim = await isPrepared(claimInfo, activeAccount)
      if (isPreparedClaim === WALLET_STATUS.INSUFFICIENT_BALANCE)
        return { error: CLAIM_ERRORS.INSUFFICIENT_BALANCE }
      if (isPreparedClaim === WALLET_STATUS.ENOUGH_USDC)
        await claimWithUsdc(claimInfo, activeAccount, address)
      if (isPreparedClaim === WALLET_STATUS.ENOUGH_ETH)
        await claimWithETH(claimInfo, activeAccount, address)

      toast.success('Purchased!')
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
