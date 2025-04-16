import { Address } from 'viem'

export type Token = {
  tokenContract: Address
  tokenId: string
  chain: string
  chainId: number
}

export type ZoraCreatedContract = {
  newContract: Address
  chainId: number
  name: string
  contractURI: string
  chain: string
}
