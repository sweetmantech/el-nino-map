import { CHAIN, DROP_ADDRESS, MANIFOLD_FEE } from '@/lib/consts'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import { useConnectModal, useSwitchActiveWalletChain } from 'thirdweb/react'
import { client } from '@/lib/thirdweb/client'
import { prepareContractCall, sendTransaction } from 'thirdweb'
import { wallets } from '@/lib/thirdweb/wallets'
import useClaimInfo, { extensionContract } from './useClaimInfo'
import usePrepareClaim from './usePrepareClaim'

const useManifoldClaim = () => {
  const { connect } = useConnectModal()
  const switchChain = useSwitchActiveWalletChain()
  const claimInfo = useClaimInfo()
  const { isPrepared } = usePrepareClaim()
  const claim = async (activeAccount: any) => {
    try {
      const address = activeAccount?.address
      if (!address) {
        connect({
          client,
          wallets,
          chain: CHAIN,
        })
        return
      }
      await switchChain(CHAIN)
      const isPreparedClaim = await isPrepared(claimInfo, activeAccount)
      if (!isPreparedClaim) return
      const transaction = prepareContractCall({
        contract: extensionContract,
        method:
          'function mintBatch(address creatorContractAddress, uint256 instanceId, uint16 mintCount, uint32[] mintIndices, bytes32[][] merkleProofs, address mintFor) payable',
        params: [DROP_ADDRESS, BigInt(claimInfo.instanceId), claimInfo.amount, [], [[]], address],
        value: MANIFOLD_FEE * BigInt(claimInfo.amount),
      })

      const { transactionHash } = await sendTransaction({
        transaction,
        account: activeAccount,
      })

      toast.success('Purchased!')
      return transactionHash
    } catch (error) {
      handleTxError(error)
      return { error }
    }
  }

  return {
    claim,
    ...claimInfo,
  }
}

export default useManifoldClaim
