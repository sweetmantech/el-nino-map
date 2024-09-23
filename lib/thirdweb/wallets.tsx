import { createWallet } from 'thirdweb/wallets'

export const wallets = [
  createWallet('embedded'),
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('me.rainbow'),
]
