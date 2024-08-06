import StackProvider from './StackProvider'
import WagmiProvider from './WagmiProvider'

export default async function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StackProvider>
      <WagmiProvider>{children}</WagmiProvider>
    </StackProvider>
  )
}
