import { createConfig, http } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import { CHAIN, CHAIN_ID } from '../consts'

const wagmiConfig = createConfig({
  chains: [CHAIN],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: 'mesa',
      // preference: "smartWalletOnly",
    }),
  ],
  ssr: true,
  transports: {
    [CHAIN_ID]: http(),
  } as any,
})

export default wagmiConfig
