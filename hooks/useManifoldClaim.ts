import { CHAIN, DROP_ADDRESS } from '@/lib/consts'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import { useConnectModal, useSwitchActiveWalletChain } from 'thirdweb/react'
import { client } from '@/lib/thirdweb/client'
import { prepareContractCall, sendTransaction } from 'thirdweb'
import { wallets } from '@/lib/thirdweb/wallets'
import { useState } from 'react'
import useClaimInfo, { extensionContract } from './useClaimInfo'

const useManifoldClaim = () => {
  const { connect } = useConnectModal()
  const switchChain = useSwitchActiveWalletChain()
  const [amount, setAmount] = useState<number>(1)
  const claimInfo = useClaimInfo()

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

      const transaction = prepareContractCall({
        contract: extensionContract,
        method:
          'function mintBatch(address creatorContractAddress, uint256 instanceId, uint16 mintCount, uint32[] mintIndices, bytes32[][] merkleProofs, address mintFor) payable',
        params: [DROP_ADDRESS, BigInt(claimInfo.instanceId), amount, [], [[]], address],
        value: BigInt('500000000000000') * BigInt(amount),
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
    amount,
    setAmount,
    ...claimInfo,
  }
}

export default useManifoldClaim
