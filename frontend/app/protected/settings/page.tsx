import { SettingsCard } from "@/components/ui/settings-card"
// Example: fetch current user on the server
// Replace with your actual data fetching logic
async function getCurrentUser() {
  return {
    name: "Francis Cejas",
    email: "francis@example.com",
  }
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  return (
    <div className="container max-w-2xl py-8 mx-auto">
      <SettingsCard user={user} />
    </div>
  )
}
