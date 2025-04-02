"use client"

import { useState } from "react"
import { useProfiles, type Profile } from "./profiles-context"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { Edit, Plus, Trash2 } from "lucide-react"

export default function AdminPanel() {
  const { profiles, addProfile, updateProfile, deleteProfile } = useProfiles()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    image: "/placeholder.svg?height=300&width=300",
    description: "",
    address: "",
    coordinates: [0, 0] as [number, number],
    details: {
      email: "",
      phone: "",
      interests: [] as string[],
      bio: "",
    },
  })

  const resetForm = () => {
    setFormData({
      name: "",
      image: "/placeholder.svg?height=300&width=300",
      description: "",
      address: "",
      coordinates: [0, 0],
      details: {
        email: "",
        phone: "",
        interests: [],
        bio: "",
      },
    })
  }

  const handleAddProfile = () => {
    addProfile(formData)
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditProfile = () => {
    if (currentProfile) {
      updateProfile(currentProfile.id, formData)
      setIsEditDialogOpen(false)
      setCurrentProfile(null)
    }
  }

  const handleDeleteProfile = () => {
    if (currentProfile) {
      deleteProfile(currentProfile.id)
      setIsDeleteDialogOpen(false)
      setCurrentProfile(null)
    }
  }

  const openEditDialog = (profile: Profile) => {
    setCurrentProfile(profile)
    setFormData({
      name: profile.name,
      image: profile.image,
      description: profile.description,
      address: profile.address,
      coordinates: profile.coordinates,
      details: {
        email: profile.details?.email || "",
        phone: profile.details?.phone || "",
        interests: profile.details?.interests || [],
        bio: profile.details?.bio || "",
      },
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (profile: Profile) => {
    setCurrentProfile(profile)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Profiles</h2>
        <p className="text-muted-foreground text-md">As of now the profiles added are not permanent and is just visible on the frontend</p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Profile</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    value={formData.coordinates[0]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: [Number.parseFloat(e.target.value), formData.coordinates[1]],
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    value={formData.coordinates[1]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coordinates: [formData.coordinates[0], Number.parseFloat(e.target.value)],
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.details.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, email: e.target.value },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.details.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, phone: e.target.value },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="interests">Interests (comma separated)</Label>
                <Input
                  id="interests"
                  value={formData.details.interests.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: {
                        ...formData.details,
                        interests: e.target.value
                          .split(",")
                          .map((i) => i.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.details.bio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, bio: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProfile}>Add Profile</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No profiles found. Add a profile to get started.
                </TableCell>
              </TableRow>
            ) : (
              profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{profile.description}</TableCell>
                  <TableCell>{profile.address}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(profile)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(profile)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-longitude">Longitude</Label>
                <Input
                  id="edit-longitude"
                  type="number"
                  value={formData.coordinates[0]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coordinates: [Number.parseFloat(e.target.value), formData.coordinates[1]],
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-latitude">Latitude</Label>
                <Input
                  id="edit-latitude"
                  type="number"
                  value={formData.coordinates[1]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coordinates: [formData.coordinates[0], Number.parseFloat(e.target.value)],
                    })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.details.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    details: { ...formData.details, email: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.details.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    details: { ...formData.details, phone: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-interests">Interests (comma separated)</Label>
              <Input
                id="edit-interests"
                value={formData.details.interests.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    details: {
                      ...formData.details,
                      interests: e.target.value
                        .split(",")
                        .map((i) => i.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-bio">Bio</Label>
              <Textarea
                id="edit-bio"
                value={formData.details.bio}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    details: { ...formData.details, bio: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Profile Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the profile of {currentProfile?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProfile} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

