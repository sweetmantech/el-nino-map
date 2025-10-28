import { useFrameProvider } from '@/providers/FrameProvider'
import { config } from '@/providers/WagmiProvider'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const FarcasterConnectButton = () => {
  const { isConnected, address } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { context } = useFrameProvider()

  const handleClick = async () => {
    if (isConnected) {
      disconnect()
      return
    }
    connect({ connector: config.connectors[0] })
  }

  return (
    <button
      type="button"
      className="bg-[#eeeef0] rounded-md uppercase font-titilliumweb py-2 px-3"
      onClick={handleClick}
    >
      {address ? context?.user?.displayName : 'Explorer'}
    </button>
  )
}

export default FarcasterConnectButton
