import { Address, prepareContractCall, sendTransaction } from 'thirdweb'
import useClaimInfo, { extensionContract } from './useClaimInfo'
import { DROP_ADDRESS, MANIFOLD_FEE } from '@/lib/consts'
import { Account } from 'thirdweb/wallets'

const useUsdcClaim = () => {
  const claimWithUsdc = async (
    claimInfo: ReturnType<typeof useClaimInfo>,
    activeAccount: Account,
    to: Address,
  ) => {
    const transaction = prepareContractCall({
      contract: extensionContract,
      method:
        'function mintBatch(address creatorContractAddress, uint256 instanceId, uint16 mintCount, uint32[] mintIndices, bytes32[][] merkleProofs, address mintFor) payable',
      params: [DROP_ADDRESS, BigInt(claimInfo.instanceId), claimInfo.amount, [], [[]], to],
      value: MANIFOLD_FEE * BigInt(claimInfo.amount),
    })

    const { transactionHash } = await sendTransaction({
      transaction,
      account: activeAccount,
    })

    return transactionHash
  }

  return {
    claimWithUsdc,
  }
}

export default useUsdcClaim
