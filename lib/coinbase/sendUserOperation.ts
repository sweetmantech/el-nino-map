import { Hash } from 'viem'
import cdp from '@/lib/coinbase/client'
import { CDP_PAYMASTER_URL } from '../consts'
import { getPublicClient } from '@/lib/clients/viem'

type EvmUserOperationNetwork = 'base-sepolia' | 'base'

export interface SendUserOperationParams {
  smartAccount: any
  calls: any[]
  network: EvmUserOperationNetwork
}

export async function sendUserOperation({ smartAccount, calls, network }: SendUserOperationParams) {
  // Send the transaction
  const sendResult = await (cdp.evm.sendUserOperation as any)({
    smartAccount,
    network,
    paymasterUrl: CDP_PAYMASTER_URL,
    calls,
  })

  // Wait for the transaction to be mined
  await (cdp.evm.waitForUserOperation as any)({
    smartAccountAddress: smartAccount.address,
    userOpHash: sendResult.userOpHash,
  })

  // Get the user operation
  const userOp = await (cdp.evm.getUserOperation as any)({
    smartAccount,
    userOpHash: sendResult.userOpHash,
  })

  // Wait for the transaction receipt
  const publicClient = getPublicClient(network === 'base-sepolia' ? 84532 : 8453)
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: userOp.transactionHash as Hash,
  })

  return transaction
}
