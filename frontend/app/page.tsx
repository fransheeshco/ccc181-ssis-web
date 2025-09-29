import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <section className="max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Get started with <span className="text-blue-600">Oracle</span> today!
        </h1>
        <p className="text-lg text-gray-600">
          Manage your account, access powerful tools, and explore our platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>

        <p className="text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </p>
      </section>
    </main>
  )
}
