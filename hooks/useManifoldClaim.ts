import { CHAIN, DROP_ADDRESS, ERC1155_LAZY_PAYABLE_CLAIM, INSTANCE_ID } from '@/lib/consts'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import { useConnectModal, useSwitchActiveWalletChain } from 'thirdweb/react'
import { client } from '@/lib/thirdweb/client'
import { prepareContractCall, sendTransaction, getContract } from 'thirdweb'
import { wallets } from '@/lib/thirdweb/wallets'
import { erc1155LazyPayableClaimAbi } from '@/lib/abi/erc_1155_lazy_payable'
import { useState } from 'react'

const useManifoldClaim = () => {
  const { connect } = useConnectModal()
  const switchChain = useSwitchActiveWalletChain()
  const [amount, setAmount] = useState<number>(1)

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
      const contract: any = getContract({
        address: ERC1155_LAZY_PAYABLE_CLAIM,
        chain: CHAIN,
        abi: erc1155LazyPayableClaimAbi as any,
        client,
      })

      const transaction = prepareContractCall({
        contract,
        method:
          'function mintBatch(address creatorContractAddress, uint256 instanceId, uint16 mintCount, uint32[] mintIndices, bytes32[][] merkleProofs, address mintFor) payable',
        params: [DROP_ADDRESS, INSTANCE_ID, amount, [], [[]], address],
        value: BigInt('500000000000000'),
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
  }
}

export default useManifoldClaim
