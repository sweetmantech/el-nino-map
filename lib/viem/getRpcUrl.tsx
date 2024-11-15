import { base, baseSepolia } from 'thirdweb/chains'

const getRpcUrl = (chainId: number) => {
  switch (chainId) {
    case baseSepolia.id:
      return 'https://84532.rpc.thirdweb.com'
    case base.id:
      return 'https://8453.rpc.thirdweb.com'
    default:
      return ''
  }
}

export default getRpcUrl
