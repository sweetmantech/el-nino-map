'use client'

import sdk from '@farcaster/frame-sdk'
import { useEffect, useState, ReactNode } from 'react'

export default function FrameProvider({ children }: { children: ReactNode }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready()
    }
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true)
      load()
    }
    // eslint-disable-next-line
  }, [isSDKLoaded])

  return <div>{children}</div>
}
