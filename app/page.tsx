import { Suspense } from "react"
import ProfileList from "@/components/profile-list"
import { ProfilesProvider } from "@/components/profiles-context"
import { Skeleton } from "@/components/ui/skeleton"
import { MapProvider } from "@/components/map-context"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ProfilesProvider>
        <MapProvider>
          <main className="flex-1 container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Profile Explorer</h1>
            <Suspense fallback={<ProfileListSkeleton />}>
              <ProfileList />
            </Suspense>
          </main>
        </MapProvider>
      </ProfilesProvider>
    </div>
  )
}

function ProfileListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4">
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-end">
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        ))}
    </div>
  )
}

