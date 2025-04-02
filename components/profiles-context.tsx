"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

export type Profile = {
  id: string
  name: string
  image: string
  bgimage:string
  description: string
  address: string
  coordinates: [number, number] // [longitude, latitude]
  details?: {
    email?: string
    phone?: string
    interests?: string[]
    bio?: string
  }
}

// Sample data
const initialProfiles: Profile[] = [
  {
    id: "1",
    name: "Will Smith",
    image: "/7309681.jpg?height=300&width=300",
    bgimage: "/download.jpeg?height=300&width=300",
    description: "Software Engineer with 5 years of experience in web development",
    address: "123 Tech Street, San Francisco, CA",
    coordinates: [-122.4194, 37.7749],
    details: {
      email: "jane.smith@example.com",
      phone: "(555) 123-4567",
      interests: ["Coding", "Hiking", "Photography"],
      bio: "Jane is a passionate software engineer who loves building user-friendly web applications. When not coding, she enjoys outdoor activities and capturing moments through her camera.",
    },
  },
  {
    id: "2",
    name: "Ryan Reynolds",
    image: "/7309681.jpg?height=300&width=300",
    bgimage: "/download.png?height=300&width=300",
    description: "Marketing Specialist with expertise in digital campaigns",
    address: "456 Market Avenue, New York, NY",
    coordinates: [-74.006, 40.7128],
    details: {
      email: "john.doe@example.com",
      phone: "(555) 987-6543",
      interests: ["Digital Marketing", "Content Creation", "Travel"],
      bio: "John is a creative marketing specialist who has helped numerous companies grow their online presence. He's always looking for new challenges and places to explore.",
    },
  },
  {
    id: "3",
    name: "Dwayne Johnson",
    image: "/7309681.jpg?height=300&width=300",
    bgimage: "/images (1).jpeg?height=300&width=300",
    description: "UX Designer focused on creating intuitive user experiences",
    address: "789 Design Blvd, Seattle, WA",
    coordinates: [-122.3321, 47.6062],
    details: {
      email: "emily.johnson@example.com",
      phone: "(555) 456-7890",
      interests: ["UI/UX Design", "Art", "Reading"],
      bio: "Emily combines her artistic background with technical skills to design interfaces that users love. She believes that good design should be both beautiful and functional.",
    },
  },
  {
    id: "4",
    name: "Michael Jordan",
    image: "/7309681.jpg?height=300&width=300",
    bgimage: "/images (2).jpeg?height=300&width=300",
    description: "Data Scientist specializing in machine learning algorithms",
    address: "101 Data Drive, Austin, TX",
    coordinates: [-97.7431, 30.2672],
    details: {
      email: "michael.brown@example.com",
      phone: "(555) 234-5678",
      interests: ["Machine Learning", "Statistics", "Chess"],
      bio: "Michael uses data to solve complex problems and build predictive models. He enjoys the challenge of finding patterns in large datasets and turning them into actionable insights.",
    },
  },
  {
    id: "5",
    name: "Chris Evans",
    image: "/7309681.jpg?height=300&width=300",
    bgimage: "/images.jpeg?height=300&width=300",
    description: "Content Strategist with a background in journalism",
    address: "202 Content Court, Chicago, IL",
    coordinates: [-87.6298, 41.8781],
    details: {
      email: "sarah.wilson@example.com",
      phone: "(555) 345-6789",
      interests: ["Writing", "Social Media", "Cooking"],
      bio: "Sarah creates engaging content strategies that help brands tell their stories. With her journalism background, she knows how to craft narratives that resonate with audiences.",
    },
  },
  {
    id: "6",
    name: "Brad Pitt",
    image: "/7309681.jpg?height=300&width=300",
    bgimage: "/images.png?height=300&width=300",
    description: "Product Manager with a focus on SaaS applications",
    address: "303 Product Place, Boston, MA",
    coordinates: [-71.0589, 42.3601],
    details: {
      email: "david.lee@example.com",
      phone: "(555) 456-7890",
      interests: ["Product Development", "Technology", "Running"],
      bio: "David bridges the gap between business needs and technical implementation. He's passionate about building products that solve real problems for users.",
    },
  },
]

type ProfilesContextType = {
  profiles: Profile[]
  filteredProfiles: Profile[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  addProfile: (profile: Omit<Profile, "id">) => void
  updateProfile: (id: string, profile: Partial<Profile>) => void
  deleteProfile: (id: string) => void
  getProfileById: (id: string) => Profile | undefined
}

const ProfilesContext = createContext<ProfilesContextType | undefined>(undefined)

export function ProfilesProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addProfile = (profile: Omit<Profile, "id">) => {
    const newProfile = {
      ...profile,
      id: Date.now().toString(),
    }
    setProfiles((prev) => [...prev, newProfile])
  }

  const updateProfile = (id: string, updatedProfile: Partial<Profile>) => {
    setProfiles((prev) => prev.map((profile) => (profile.id === id ? { ...profile, ...updatedProfile } : profile)))
  }

  const deleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id))
  }

  const getProfileById = (id: string) => {
    return profiles.find((profile) => profile.id === id)
  }

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        filteredProfiles,
        searchTerm,
        setSearchTerm,
        addProfile,
        updateProfile,
        deleteProfile,
        getProfileById,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  )
}

export function useProfiles() {
  const context = useContext(ProfilesContext)
  if (context === undefined) {
    throw new Error("useProfiles must be used within a ProfilesProvider")
  }
  return context
}

