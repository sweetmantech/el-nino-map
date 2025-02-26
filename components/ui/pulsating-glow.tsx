'use client'

import type React from 'react'

interface PulsatingGlowProps {
  children: React.ReactNode
}

const PulsatingGlow: React.FC<PulsatingGlowProps> = ({ children }) => {
  return (
    <div className="relative">
      <div className="absolute size-full animate-glow bg-[#ef4444] opacity-[0.7] blur-[25px]" />
      <div className="relative  rounded-full z-10">{children}</div>
    </div>
  )
}

export default PulsatingGlow
