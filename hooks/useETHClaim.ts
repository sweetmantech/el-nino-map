import { Address, prepareContractCall, sendTransaction } from 'thirdweb'
import useClaimInfo from './useClaimInfo'
import {
  CHAIN_ID,
  DROP_ADDRESS,
  ERC1155_LAZY_PAYABLE_CLAIM,
  MANIFOLD_FEE,
  OUTCOMING_WRAPPER_ETH,
  WRAPPER_ADAPTER,
} from '@/lib/consts'
import {
  QUOTER_ADDRESSES,
  SWAP_ROUTER_02_ADDRESSES,
  V3_CORE_FACTORY_ADDRESSES,
} from '@uniswap/sdk-core'
import { WETH_TOKEN } from '@/lib/tokens'
import { FeeAmount } from '@uniswap/v3-sdk'
import { wrapperContract } from '@/lib/contracts'
import { useActiveAccount } from 'thirdweb/react'
import { useAccount, useWriteContract } from 'wagmi'
import { useFrameProvider } from '@/providers/FrameProvider'
import { wrapperAbi } from '@/lib/abi/wrapperAbi'
import getViemNetwork from '@/lib/viem/getViemNetwork'

const useETHClaim = () => {
  const activeAccount = useActiveAccount()
  const { address } = useAccount()
  const { context } = useFrameProvider()
  const { writeContractAsync } = useWriteContract()

  const claimWithETH = async (claimInfo: ReturnType<typeof useClaimInfo>) => {
    const claimArgs: any = [
      {
        swapFactory: V3_CORE_FACTORY_ADDRESSES[CHAIN_ID],
        swapRouter: SWAP_ROUTER_02_ADDRESSES(CHAIN_ID),
        quoterV2: QUOTER_ADDRESSES[CHAIN_ID],
        tokenIn: WETH_TOKEN.address,
        fee: FeeAmount.LOW,
      },
      {
        extensionContract: ERC1155_LAZY_PAYABLE_CLAIM,
        creatorContractAddress: DROP_ADDRESS,
        instanceId: BigInt(claimInfo.instanceId),
        mintCount: claimInfo.amount,
        mintIndices: [],
        merkleProofs: [[]],
      },
      context ? (address as Address) : (activeAccount.address as Address),
    ]
    const claimValue =
      MANIFOLD_FEE * BigInt(claimInfo.amount) + OUTCOMING_WRAPPER_ETH * BigInt(claimInfo.amount)
    if (context) {
      const hash = await writeContractAsync({
        address: WRAPPER_ADAPTER,
        abi: wrapperAbi as any,
        chain: getViemNetwork(CHAIN_ID),
        account: address,
        functionName: 'mint',
        args: claimArgs,
        value: claimValue,
      })
      return hash
    }
    const transaction = prepareContractCall({
      contract: wrapperContract,
      method:
        'function mint((address swapFactory, address swapRouter, address quoterV2, address tokenIn, uint24 fee) swapData, (address extensionContract, address creatorContractAddress, uint256 instanceId, uint16 mintCount, uint32[] mintIndices, bytes32[][] merkleProofs) mintData, address to) payable',
      params: claimArgs,
      value: claimValue,
    })

    const { transactionHash } = await sendTransaction({
      transaction,
      account: activeAccount,
    })

    return transactionHash
  }

  return {
    claimWithETH,
  }
}

export default useETHClaim
