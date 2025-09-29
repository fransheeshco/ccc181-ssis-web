import { cookies } from "next/headers"
import { DataTable } from "@/components/ui/data-table"
import { AddCollegeDialogue } from "@/components/forms/AddCollegeDialog"
import { columns } from "./columns"
import { CollegeProvider } from "@/app/context/collegeContext"
import { College } from "@/app/context/collegeContext"

async function getData(): Promise<College[]> {
  const cookieStore = await cookies()
  const cookieHeader = await cookieStore.toString()

  const response = await fetch("http://localhost:8000/api/colleges/", {
    cache: "no-store",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
  })

  return response.json()
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <CollegeProvider initialData={data}>
      <div className="container mx-auto">
        <section className="text-6xl font-bold">College Management</section>
        <DataTable
          columns={columns}
          data={data} // still works SSR
          toolBarComponent={{
            Component: AddCollegeDialogue,
            props: { label: "College" },
          }}
        />
      </div>
    </CollegeProvider>
  )
}
