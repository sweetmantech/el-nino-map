'use client'

import { client } from '@/lib/thirdweb/client'
import { ConnectButton } from 'thirdweb/react'
import { base, sepolia } from 'thirdweb/chains'
import { wallets } from '@/lib/thirdweb/wallets'
import { IS_TESTNET } from '@/lib/consts'
import { usePathname, useRouter } from 'next/navigation'
import { useFrameProvider } from '@/providers/FrameProvider'
import FarcasterConnectButton from './FarcasterConnectButton'

const Header = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const { push } = useRouter()
  const { context } = useFrameProvider()

  return (
    <div className="fixed z-[100] top-4 left-0 px-8 w-fit flex justify-between items-center w-screen">
      {!isHomePage && (
        <button
          type="button"
          className="bg-black text-white px-3 py-2 font-titilliumweb rounded-md"
          onClick={() => push('/')}
        >
          Back To Home
        </button>
      )}
      <div className="ml-auto">
        {!context ? (
          <FarcasterConnectButton />
        ) : (
          <ConnectButton
            client={client}
            wallets={wallets}
            chain={IS_TESTNET ? sepolia : base}
            connectButton={{
              label: 'EXPLORE',
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Header
