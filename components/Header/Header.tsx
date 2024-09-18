import { client } from '@/lib/thirdweb/client'
import { ConnectButton } from 'thirdweb/react'
import { baseSepolia } from 'thirdweb/chains'
import { wallets } from '@/lib/thirdweb/wallets'

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-screen z-[100] flex justify-end p-4">
      <ConnectButton client={client} wallets={wallets} chain={baseSepolia} />
    </div>
  )
}

export default Header
