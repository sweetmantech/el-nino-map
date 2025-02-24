import { createConfig, http, WagmiProvider } from 'wagmi'
import { base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { farcasterFrame } from '@farcaster/frame-wagmi-connector'
import { Metadata } from 'next'

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [farcasterFrame() as any],
})

const queryClient = new QueryClient()

export const metadata: Metadata = {
  title: 'El Niño Maravilla Pt. 1',
  description: ` El Niño Maravilla is the debut album by xcelencia, showcasing a unique blend of Latin
  urban and pop sounds. This project brings together a talented team of designers,
  developers, and producers to create a groundbreaking musical experience.`,
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: '/images/space-station.png',
      button: {
        title: 'El Niño',
        action: {
          type: 'launch_frame',
          name: 'El Niño Maravilla Pt. 1',
          url: 'https://el-nino-map-git-techengme-myc-983-31152c-sweetmantechs-projects.vercel.app/',
          splashImageUrl: '/images/space-station.png',
          splashBackgroundColor: '#ffffff',
        },
      },
    }),
  },
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
