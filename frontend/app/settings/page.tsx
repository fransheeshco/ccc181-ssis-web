import { SettingsForm } from "@/components/forms/SettingsForm"

export default function page() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <SettingsForm />
    </main>
  )
}
