import { SettingsCard } from "@/components/ui/settings-card"
import { cookies } from 'next/headers'
import axios from 'axios'

async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const cookieString = cookieStore.getAll()
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ')

    const response = await axios.get("http://localhost:8000/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieString
      },
      withCredentials: true
    })

    return response.data.user
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to fetch user:", error.response?.data || error.message)
    } else {
      console.error("Failed to fetch user:", error)
    }
    return null
  }
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="container max-w-2xl py-8 mx-auto">
        <div className="text-center text-gray-500">
          Please log in to view settings
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-8 mx-auto">
      <SettingsCard user={user} />
    </div>
  )
}