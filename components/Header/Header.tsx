import { client } from '@/lib/thirdweb/client'
import { ConnectButton } from 'thirdweb/react'
import { createWallet } from 'thirdweb/wallets'
import { CHAIN } from '@/lib/consts'

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-screen z-[100] flex justify-end p-4">
      <ConnectButton client={client} wallets={[createWallet('embedded')]} chain={CHAIN} />
    </div>
  )
}

export default Header
