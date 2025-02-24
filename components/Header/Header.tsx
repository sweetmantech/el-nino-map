'use client'

import { client } from '@/lib/thirdweb/client'
import { ConnectButton } from 'thirdweb/react'
import { baseSepolia } from 'thirdweb/chains'
import { wallets } from '@/lib/thirdweb/wallets'

const Header = () => (
  <div className="fixed z-[100] top-4 right-8 w-fit">
    <ConnectButton
      client={client}
      wallets={wallets}
      chain={baseSepolia}
      connectButton={{
        label: 'EXPLORE',
      }}
    />
  </div>
)

export default Header
