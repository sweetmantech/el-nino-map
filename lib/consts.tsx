import { base, sepolia } from 'thirdweb/chains'
import { encodeEventTopics } from 'viem'
import { zoraCreator1155FactoryImplABI } from '@zoralabs/protocol-deployments'
import { erc1155LazyPayableClaimAbi } from './abi/erc_1155_lazy_payable'

export const IS_TESTNET = process.env.NEXT_PUBLIC_TEST === 'true'
export const CHAIN = IS_TESTNET ? sepolia : base
export const CHAIN_ID = CHAIN.id

export const DROP_ADDRESS = IS_TESTNET
  ? '0x33f41850b02cb3886f9dbec40c2531933a0b5e00' // sepolia testnet
  : '0xEaB564Ad61777C6d50744a97088da545A0BcE8dE' // base mainnet

export const ERC721_LAZY_PAYABLE_CLAIM = '0x23aA05a271DEBFFAA3D75739aF5581f744b326E4'
export const ERC1155_LAZY_PAYABLE_CLAIM = '0x26BBEA7803DcAc346D5F5f135b57Cf2c752A02bE'

export const INSTANCE_ID = IS_TESTNET ? BigInt(4244961520) : BigInt(4277512432)
export const ZORA_PRICE = '111000000000000'
export const MANIFOLD_FEE = '500000000000000'

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

export const CLAIM_INITIALIZED_EVENT_SIGNATURE = encodeEventTopics({
  abi: erc1155LazyPayableClaimAbi,
  eventName: 'ClaimInitialized',
})[0]

export const xcelencia_eth = '0x089036a0835C6cF82e7fC42e9e95DfE05e110c81'

export const PULSATING_COLORS = {
  mint: '#33d6bf',
  spinamp: '#8f03e8',
  leaderboard: '#9f7c9a',
  metadata: '#54c9db',
  video: '#3ea6a0',
  merch: '#95929c',
  'live-show': '#578de4',
  control: '#be0253',
  subscribe: '#d081d3',
  memories: '#45b2c7',
  plannet: '#70c8f7',
}

export const APP_URL = 'https://maravilla.city'
