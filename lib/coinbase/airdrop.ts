import { erc1155LazyPayableClaimAbi } from '../abi/erc_1155_lazy_payable'
import { ERC1155_LAZY_PAYABLE_CLAIM } from '../consts'
import { getOrCreateSmartWallet } from './getOrCreateSmartWallet'
import { encodeFunctionData } from 'viem'
import { sendUserOperation } from './sendUserOperation'
import { Address } from 'thirdweb'

const airdrop = async () => {
  const smartAccount = await getOrCreateSmartWallet()
  const MANIFOLD_DROP_ADDRESS = '0x631ea07B7FE787dEa788274F01CC09F2Ff8BFDc0' // this should be replaced with xcelencia drop address
  const MANIFOLD_DROP_INSTANCE_ID = 4140912880 // this should be replaced with xcelencia drop instance id
  const MANIFOLD_DROP_RECIPIENTS = ['0x323e8bcb41ae2454c3f4899e094c599aab6b84bc']
  const MANIFOLD_DROP_AMOUNTS = [BigInt(1)]

  const airdropCall = encodeFunctionData({
    abi: erc1155LazyPayableClaimAbi as any,
    functionName: 'airdrop',
    args: [
      MANIFOLD_DROP_ADDRESS,
      BigInt(MANIFOLD_DROP_INSTANCE_ID),
      MANIFOLD_DROP_RECIPIENTS,
      MANIFOLD_DROP_AMOUNTS,
    ],
  })
  const transaction = await sendUserOperation({
    smartAccount,
    network: 'base',
    calls: [
      {
        to: ERC1155_LAZY_PAYABLE_CLAIM as Address,
        data: airdropCall as any,
      },
    ],
  })

  return transaction.transactionHash
}

export default airdrop
