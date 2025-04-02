import { Suspense } from "react"
import ProfileDetail from "@/components/profile-detail"
import { Skeleton } from "@/components/ui/skeleton"
import { ProfilesProvider } from "@/components/profiles-context"
import { MapProvider } from "@/components/map-context"

interface ProfilePageProps {
  params: {
    id: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <ProfilesProvider>
      <MapProvider>
        <div className="container mx-auto py-8 px-4">
          <Suspense fallback={<ProfileDetailSkeleton />}>
            <ProfileDetail id={params.id} />
          </Suspense>
        </div>
      </MapProvider>
    </ProfilesProvider>
  )
}

function ProfileDetailSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Skeleton className="h-80 w-full rounded-lg" />
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="pt-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}

