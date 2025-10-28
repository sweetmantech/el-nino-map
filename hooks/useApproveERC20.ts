import { useFrameProvider } from '@/providers/FrameProvider'
import { useAccount, useWriteContract } from 'wagmi'
import { erc20Abi, maxUint256, type Address } from 'viem'
import { CHAIN } from '@/lib/consts'
import getViemNetwork from '@/lib/viem/getViemNetwork'
import { prepareContractCall, sendTransaction } from 'thirdweb'
import { currencyContract } from '@/lib/contracts'
import { useActiveAccount } from 'thirdweb/react'

const useApproveERC20 = () => {
  const { writeContractAsync } = useWriteContract()
  const { context } = useFrameProvider()
  const activeAccount = useActiveAccount()
  const { address } = useAccount()

  const approve = async (erc20Address: Address, spender: Address) => {
    const account = context ? address : (activeAccount?.address as Address)
    if (!account || !activeAccount) return

    if (context) {
      const hash = await writeContractAsync({
        address: erc20Address,
        abi: erc20Abi,
        functionName: 'approve',
        args: [spender, maxUint256],
        chain: getViemNetwork(CHAIN.id),
        account,
      })
      return hash
    }

    const transaction = prepareContractCall({
      contract: currencyContract(erc20Address),
      method: 'approve',
      params: [spender, maxUint256],
    })

    const { transactionHash } = await sendTransaction({
      transaction,
      account: activeAccount,
    })
    return transactionHash
  }

  return {
    approve,
  }
}

export default useApproveERC20
