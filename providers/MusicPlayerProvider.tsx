'use client'

import useMusicPlayer from '@/hooks/useMusicPlayer'
import React, { createContext, useContext, useMemo } from 'react'

const MusicPlayerContext = createContext<ReturnType<typeof useMusicPlayer>>(
  {} as ReturnType<typeof useMusicPlayer>,
)

const MusicPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const musicPlayer = useMusicPlayer()

  const value = useMemo(() => ({ ...musicPlayer }), [musicPlayer])

  return <MusicPlayerContext.Provider value={value}>{children}</MusicPlayerContext.Provider>
}

const useMusicPlayerProvider = () => {
  const context = useContext(MusicPlayerContext)
  if (!context) {
    throw new Error('useMusicPlayerProvider must be used within a MusicPlayerProvider')
  }
  return context
}

export { MusicPlayerProvider, useMusicPlayerProvider }
