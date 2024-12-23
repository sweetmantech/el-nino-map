'use client'

import useMap from '@/hooks/useMap'
import React, { createContext, useContext, useMemo } from 'react'

const MapContext = createContext<ReturnType<typeof useMap>>({} as ReturnType<typeof useMap>)

const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const map = useMap()

  const value = useMemo(() => ({ ...map }), [map])

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}

const useMapProvider = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMapProvider must be used within a MapProvider')
  }
  return context
}

export { MapProvider, useMapProvider }
