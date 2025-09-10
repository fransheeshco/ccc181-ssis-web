import { columns, College } from "./columns"
import { DataTable } from "@/components/ui/data-table"

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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}