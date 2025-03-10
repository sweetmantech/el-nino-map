import { CHAIN, DROP_ADDRESS, ERC721_LAZY_PAYABLE_CLAIM, INSTANCE_ID } from '@/lib/consts'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'
import { useConnectModal, useSwitchActiveWalletChain } from 'thirdweb/react'
import { client } from '@/lib/thirdweb/client'
import { prepareContractCall, sendTransaction, getContract } from 'thirdweb'
import { wallets } from '@/lib/thirdweb/wallets'
import { erc721LazyPayableClaimAbi } from '@/lib/abi/erc721_lazy_payable'

const useManifoldClaim = () => {
  const { connect } = useConnectModal()
  const switchChain = useSwitchActiveWalletChain()

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
        address: ERC721_LAZY_PAYABLE_CLAIM,
        chain: CHAIN,
        abi: erc721LazyPayableClaimAbi as any,
        client,
      })

      const transaction = prepareContractCall({
        contract,
        method:
          'function mint(address creatorContractAddress, uint256 instanceId, uint32 mintIndex, bytes32[] merkleProof, address mintFor) payable',
        params: [DROP_ADDRESS, INSTANCE_ID, 0, [], address],
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
  }
}

export default useManifoldClaim
