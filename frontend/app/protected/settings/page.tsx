"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { SettingsCard } from "@/components/ui/settings-card"

export default function SettingsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me", { withCredentials: true })
        setUser(res.data.user)
      } catch (error) {
        console.error("Failed to fetch user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) return <div className="text-center text-gray-500">Loading...</div>
  if (!user) return <div className="text-center text-gray-500">Please log in to view settings</div>

  return (
    <div className="container max-w-2xl py-8 mx-auto">
      <SettingsCard user={user} />
    </div>
  )
}
