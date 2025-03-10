import { client } from '@/lib/thirdweb/client'
import { ConnectButton } from 'thirdweb/react'
import { base, sepolia } from 'thirdweb/chains'
import { wallets } from '@/lib/thirdweb/wallets'
import { IS_TESTNET } from '@/lib/consts'

const Header = () => (
  <div className="fixed z-[100] top-4 right-8 w-fit">
    <ConnectButton
      client={client}
      wallets={wallets}
      chain={IS_TESTNET ? sepolia : base}
      connectButton={{
        label: 'EXPLORE',
      }}
    />
  </div>
)

export default Header
