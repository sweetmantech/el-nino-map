import { client } from '@/lib/thirdweb/client'
import { ConnectButton } from 'thirdweb/react'
import { baseSepolia } from 'thirdweb/chains'
import { wallets } from '@/lib/thirdweb/wallets'

const Header = () => {
  return (
    <div className="fixed z-[100] top-4 right-4 w-fit">
      <ConnectButton client={client} wallets={wallets} chain={baseSepolia} />
    </div>
  )
}

export default Header
