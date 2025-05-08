import { getContract } from 'thirdweb'
import {
  CHAIN,
  DROP_ADDRESS,
  ERC1155_LAZY_PAYABLE_CLAIM,
  SUBSCRIPTION,
  WRAPPER_ADAPTER,
} from './consts'
import { stpv2Abi } from './abi/stpv2'
import { client } from './thirdweb/client'
import { Address, erc20Abi } from 'viem'
import { erc1155LazyPayableClaimAbi } from './abi/erc_1155_lazy_payable'
import { erc1155Abi } from './abi/erc1155Abi'
import { wrapperAbi } from './abi/wrapperAbi'

export const subscriptionContract = getContract({
  address: SUBSCRIPTION as Address,
  abi: stpv2Abi as any,
  chain: CHAIN,
  client,
})

export const currencyContract = (currency: string) => {
  return getContract({
    address: currency as Address,
    abi: erc20Abi,
    chain: CHAIN,
    client,
  })
}

export const extensionContract: any = getContract({
  address: ERC1155_LAZY_PAYABLE_CLAIM,
  chain: CHAIN,
  abi: erc1155LazyPayableClaimAbi as any,
  client,
})

export const mainfoldContract = getContract({
  address: DROP_ADDRESS,
  chain: CHAIN,
  abi: erc1155Abi as any,
  client,
})

export const wrapperContract = getContract({
  address: WRAPPER_ADAPTER,
  abi: wrapperAbi as any,
  chain: CHAIN,
  client,
})
