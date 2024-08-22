'use client'

import { ThirdwebProvider } from 'thirdweb/react'

export default async function Providers({ children }: { children: React.ReactNode }) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>
}
