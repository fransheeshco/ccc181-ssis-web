import { columns, Program } from "./columns"
import { DataTable } from "@/components/ui/data-table"

async function getData(): Promise<Program[]> {
  // Fetch data from your API here.
  return [
    {
      programCode: "BSCS",
      programName: "Francis",
      collegeCode: "CCS"
    },
    {
      programCode: "BSCS",
      programName: "Francis",
      collegeCode: "CCS"
    },
    {
      programCode: "BSCS",
      programName: "Francis",
      collegeCode: "CCS"
    },
    {
      programCode: "BSCS",
      programName: "Francis",
      collegeCode: "CCS"
    },
    {
      programCode: "BSCS",
      programName: "Francis",
      collegeCode: "CCS"
    },
    {
      programCode: "BSCS",
      programName: "Francis",
      collegeCode: "CCS"
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