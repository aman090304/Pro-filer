"use client"

import { useState } from "react"
import { useProfiles } from "./profiles-context"
import ProfileCard from "./profile-card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import MapDialog from "./map-dialog"

export default function ProfileList() {
  const { filteredProfiles, searchTerm, setSearchTerm } = useProfiles()
  const [filters, setFilters] = useState({
    sanFrancisco: false,
    newYork: false,
    seattle: false,
    austin: false,
    chicago: false,
    boston: false,
  })

  // Apply location filters if any are selected
  const applyFilters = () => {
    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    if (activeFilters.length === 0) return filteredProfiles

    return filteredProfiles.filter((profile) => {
      if (filters.sanFrancisco && profile.address.includes("San Francisco")) return true
      if (filters.newYork && profile.address.includes("New York")) return true
      if (filters.seattle && profile.address.includes("Seattle")) return true
      if (filters.austin && profile.address.includes("Austin")) return true
      if (filters.chicago && profile.address.includes("Chicago")) return true
      if (filters.boston && profile.address.includes("Boston")) return true
      return false
    })
  }

  const displayedProfiles = applyFilters()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search profiles by name, description or location..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Profiles</SheetTitle>
              <SheetDescription>Filter profiles by location or other criteria</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Locations</h3>
                <div className="space-y-2">
                  {Object.entries({
                    sanFrancisco: "San Francisco",
                    newYork: "New York",
                    seattle: "Seattle",
                    austin: "Austin",
                    chicago: "Chicago",
                    boston: "Boston",
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={filters[key as keyof typeof filters]}
                        onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, [key]: !!checked }))}
                      />
                      <Label htmlFor={key}>{label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {displayedProfiles.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No profiles found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}

      <MapDialog />
    </div>
  )
}

