import { columns, College } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { AddCollegeDialogue } from "@/components/forms/AddCollegeDialog"

async function getData(): Promise<College[]> {
  // Fetch data from your API here.
  return [
    {
      collegeCode: "CCS",
      collegeName: "College of Computer Studies"
    },
    {
      collegeCode: "CCS",
      collegeName: "College of Computer Studies"
    },
    {
      collegeCode: "CCS",
      collegeName: "College of Computer Studies"
    },
    {
      collegeCode: "CCS",
      collegeName: "College of Computer Studies"
    },
    {
      collegeCode: "CCS",
      collegeName: "College of Computer Studies"
    },
    {
      collegeCode: "CCS",
      collegeName: "College of Computer Studies"
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <section className="text-6xl font-bold">College Management</section>
      <DataTable
        columns={columns}
        data={data}
        toolBarComponent={{
          Component: AddCollegeDialogue,
          props: { label: "College" }
        }}
      />
    </div>
  )
}