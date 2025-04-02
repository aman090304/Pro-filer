"use client"

import { useProfiles } from "./profiles-context"
import { useMap } from "./map-context"
import { Button } from "./ui/button"
import { MapPin, Mail, Phone, ArrowLeft } from "lucide-react"
import { Badge } from "./ui/badge"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import MapDialog from "./map-dialog"

interface ProfileDetailProps {
  id: string
}

export default function ProfileDetail({ id }: ProfileDetailProps) {
  const { getProfileById } = useProfiles()
  const { setSelectedProfile, openMap } = useMap()

  const profile = getProfileById(id)

  if (!profile) {
    notFound()
  }

  const handleShowOnMap = () => {
    setSelectedProfile(profile)
    openMap()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{profile.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="relative h-80 rounded-lg overflow-hidden">
          <Image src={profile.image || "/placeholder.svg"} alt={profile.name} fill className="object-cover" />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-muted-foreground">{profile.details?.bio || profile.description}</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Contact Information</h2>

            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <p>{profile.address}</p>
                <Button variant="link" className="h-auto p-0 text-primary" onClick={handleShowOnMap}>
                  View on map
                </Button>
              </div>
            </div>

            {profile.details?.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <p>{profile.details.email}</p>
              </div>
            )}

            {profile.details?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <p>{profile.details.phone}</p>
              </div>
            )}
          </div>

          {profile.details?.interests && profile.details.interests.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.details.interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <MapDialog />
    </div>
  )
}

