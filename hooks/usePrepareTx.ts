import { useFrameProvider } from '@/providers/FrameProvider'
import { config } from '@/providers/WagmiProvider'
import { useActiveAccount, useConnectModal } from 'thirdweb/react'
import { useAccount, useConnect } from 'wagmi'
import { client } from '@/lib/thirdweb/client'
import { CHAIN } from '@/lib/consts'
import { wallets } from '@/lib/thirdweb/wallets'

const usePrepareTx = () => {
  const { context } = useFrameProvider()
  const { address } = useAccount()
  const activeAccount = useActiveAccount()
  const { connect: connectFarcasterWallet } = useConnect()
  const { connect: connectModal } = useConnectModal()

  const isPreparedTx = async () => {
    if (context) {
      if (!address) {
        connectFarcasterWallet({
          connector: config.connectors[0],
        })
        return false
      }
    } else {
      if (!activeAccount?.address) {
        await connectModal({
          client,
          wallets,
          chain: CHAIN,
        })
        return false
      }
    }
    return true
  }

  return {
    isPreparedTx,
  }
}

export default usePrepareTx
