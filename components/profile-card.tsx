"use client"

import type { Profile } from "./profiles-context"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { MapPin } from "lucide-react"
import { useMap } from "./map-context"
import Link from "next/link"
import Image from "next/image"

interface ProfileCardProps {
  profile: Profile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const { setSelectedProfile, openMap } = useMap()

  const handleShowOnMap = () => {
    setSelectedProfile(profile)
    openMap()
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="relative p-0">
        <div className="relative w-full h-28">
          <Image
            src={profile.bgimage || "/default-banner.jpg"}
            alt="Banner Image"
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 h-20 w-20">
          <Image
            src={profile.image || "/placeholder.svg"}
            alt={profile.name}
            fill
            className="object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 pt-6">
        <Link href={`/profiles/${profile.id}`} className="hover:underline">
          <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
        </Link>
        <p className="text-muted-foreground mb-2">{profile.description}</p>
        <div className="flex items-start gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{profile.address}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="ml-auto" onClick={handleShowOnMap}>
          Show on Map
        </Button>
      </CardFooter>
    </Card>
  )
}

