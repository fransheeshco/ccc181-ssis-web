"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation";

interface SettingsCardProps {
  user: {
    name: string
    email: string
  }
}

export function SettingsCard({ user }: SettingsCardProps) {
  const Router = useRouter();
  const handleLogout = async () => {
    const resp = await fetch("http://localhost:8000/api/users/logout", {
      method: "POST",
      credentials: "include",
    })
    if (resp.ok) {
      Router.push("/")
      return
    }
    // Handle error case as needed
    console.log("User logged out")
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
            <p className="text-gray-800">{user.name}</p>
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
