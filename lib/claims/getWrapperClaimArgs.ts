import { Address } from 'thirdweb'
import { CHAIN_ID, DROP_ADDRESS, ERC1155_LAZY_PAYABLE_CLAIM } from '@/lib/consts'
import {
  QUOTER_ADDRESSES,
  SWAP_ROUTER_02_ADDRESSES,
  V3_CORE_FACTORY_ADDRESSES,
} from '@uniswap/sdk-core'
import { WETH_TOKEN } from '@/lib/tokens'
import { FeeAmount } from '@uniswap/v3-sdk'
import useClaimInfo from '@/hooks/useClaimInfo'

const getWrapperClaimArgs = (
  claimInfo: ReturnType<typeof useClaimInfo>,
  activeAccountAddress: Address,
) => {
  const claimArgs = [
    {
      swapFactory: V3_CORE_FACTORY_ADDRESSES[CHAIN_ID],
      swapRouter: SWAP_ROUTER_02_ADDRESSES(CHAIN_ID),
      quoterV2: QUOTER_ADDRESSES[CHAIN_ID],
      tokenIn: WETH_TOKEN.address,
      fee: FeeAmount.LOW as number,
    },
    {
      extensionContract: ERC1155_LAZY_PAYABLE_CLAIM,
      creatorContractAddress: DROP_ADDRESS,
      instanceId: BigInt(claimInfo.instanceId),
      mintCount: claimInfo.amount,
      mintIndices: [] as number[],
      merkleProofs: [[]] as readonly (readonly `0x${string}`[])[],
    },
    activeAccountAddress,
  ] as const

  return claimArgs
}

export default getWrapperClaimArgs
