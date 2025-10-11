"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import axios from "axios"

interface SettingsCardProps {
  user: {
    username: string
    email: string
  }
}

export function SettingsCard({ user }: SettingsCardProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/logout",
        {}, // Empty body
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      if (response.status === 200) {
        console.log("User logged out successfully")
        router.push("/")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Logout failed:", error.response?.data || error.message)
      } else {
        console.error("Logout failed:", error)
      }
      // Even if there's an error, we can still redirect to home
      router.push("/")
    }
  }

  return (
    <div className="max-w-full items-center justify-center space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Logged in as</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label>Username</Label>
            <p className="text-gray-800">{user.username}</p>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Email</Label>
            <p className="text-gray-800">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      <Button
        type="button"
        variant="destructive"
        className="w-full"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  )
}