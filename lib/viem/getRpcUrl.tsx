import { base, baseSepolia } from 'thirdweb/chains'

const getRpcUrl = (chainId: number) => {
  switch (chainId) {
    case baseSepolia.id:
      return 'https://84532.rpc.thirdweb.com'
    case base.id:
      return 'https://base-pokt.nodies.app'
    default:
      return ''
  }
}

export default getRpcUrl
