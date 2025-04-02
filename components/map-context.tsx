"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import type { Profile } from "./profiles-context"

type MapContextType = {
  selectedProfile: Profile | null
  setSelectedProfile: (profile: Profile | null) => void
  isMapOpen: boolean
  openMap: () => void
  closeMap: () => void
}

const MapContext = createContext<MapContextType | undefined>(undefined)

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [isMapOpen, setIsMapOpen] = useState(false)

  const openMap = () => setIsMapOpen(true)
  const closeMap = () => setIsMapOpen(false)

  return (
    <MapContext.Provider
      value={{
        selectedProfile,
        setSelectedProfile,
        isMapOpen,
        openMap,
        closeMap,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export function useMap() {
  const context = useContext(MapContext)
  if (context === undefined) {
    throw new Error("useMap must be used within a MapProvider")
  }
  return context
}

