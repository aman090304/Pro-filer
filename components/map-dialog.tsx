"use client"

import { useMap } from "./map-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import MapComponent from "./map-component"
import Map from "./Map"

export default function MapDialog() {
  const { isMapOpen, closeMap, selectedProfile } = useMap()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading the map
  useEffect(() => {
    if (isMapOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isMapOpen, selectedProfile])

  return (
    <Dialog open={isMapOpen} onOpenChange={(open) => !open && closeMap()}>
      <DialogContent className="sm:max-w-[800px] h-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{selectedProfile ? `${selectedProfile.name}'s Location` : "Map View"}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-[500px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : selectedProfile ? (
          <div className="h-[500px] relative">
            {/* <Map center={selectedProfile.coordinates}
              markers={[
                {
                  id: selectedProfile.id,
                  coordinates: selectedProfile.coordinates,
                  title: selectedProfile.name,
                  description: selectedProfile.address,
                },
              ]} /> */}
            <MapComponent
              center={selectedProfile.coordinates}
              markers={[
                {
                  id: selectedProfile.id,
                  coordinates: selectedProfile.coordinates,
                  title: selectedProfile.name,
                  description: selectedProfile.address,
                },
              ]}
            />
          </div>
        ) : (
          <div>No profile selected</div>
        )}

      </DialogContent>
    </Dialog>
  )
}

