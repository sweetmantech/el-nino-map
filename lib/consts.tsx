import { base, baseSepolia } from 'thirdweb/chains'
import { encodeEventTopics } from 'viem'
import { zoraCreator1155FactoryImplABI } from '@zoralabs/protocol-deployments'

export const IS_TESTNET = process.env.NEXT_PUBLIC_TEST === 'true'
export const CHAIN = IS_TESTNET ? baseSepolia : base
export const CHAIN_ID = CHAIN.id

// Zora
export const DROP_ADDRESS = IS_TESTNET
  ? '0xb2bf06A4fa038E878FBB280da9c53aCaa505747E' // base sepolia
  : '0x6af64b3735947e7295242350a7046434b8520bd5' // base mainnet

export const ZORA_PRICE = '111000000000000'

export const COMMENT = 'XCELENCIA - ERC6551 smart album 🪄'
export const FIRST_SMART_WALLET_LOGIN_EVENT = 'first_smart_wallet_login'
export const SHARE_MEMORY_EVENT = 'share_memories'
export const SMART_WALLET_LOGIN_POINT = 11
export const SHARE_MEMORY_POINT = 1
export const POINT_SYSTEM_ID = 2995
export const MINT_REFERRAL = '0x089036a0835C6cF82e7fC42e9e95DfE05e110c81'
export const SUBSCRIPTION = '0xFb31451F15fa9da497bD0F7A960e52Bb8512a4De'
export const STPV2 = '0x3Fb6478F4f767993a5eD804608c7ABe31B73DeA9'

export const SETUP_NEW_CONTRACT_EVENT_SIGNATURE = encodeEventTopics({
  abi: zoraCreator1155FactoryImplABI,
  eventName: 'SetupNewContract',
})[0]

export const xcelencia_eth = '0x089036a0835C6cF82e7fC42e9e95DfE05e110c81'
