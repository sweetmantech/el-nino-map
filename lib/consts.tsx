import { base, baseSepolia } from 'wagmi/chains'

export const IS_TESTNET = process.env.NEXT_PUBLIC_TEST === 'true'
export const CHAIN = IS_TESTNET ? baseSepolia : base
export const CHAIN_ID = CHAIN.id
export const FIRST_SMART_WALLET_LOGIN_EVENT = 'first_smart_wallet_login'
export const SMART_WALLET_LOGIN_POINT = 11
