import { base } from 'thirdweb/chains'

export const IS_TESTNET = process.env.NEXT_PUBLIC_TEST === 'true'
export const CHAIN = base
export const CHAIN_ID = CHAIN.id

// Zora
export const DROP_ADDRESS = '0x16F1FC98282AFDA367999012027b5A3fA656a713'

export const ZORA_PRICE = '777000000000000'

export const COMMENT = 'XCELENCIA - ERC6551 smart album 🪄'
export const FIRST_SMART_WALLET_LOGIN_EVENT = 'first_smart_wallet_login'
export const SMART_WALLET_LOGIN_POINT = 11
export const POINT_SYSTEM_ID = 2995
