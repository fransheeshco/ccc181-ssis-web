import { columns, Program } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { AddProgramDialog } from "@/components/forms/AddProgramDialog"

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
  const data: Program[] = await getData()

  return (
    <div className="container mx-auto">
      <section className="text-6xl">Program Management</section>
      <DataTable
        columns={columns}
        data={data}
        toolBarComponent={{
          Component: AddProgramDialog,
          props: { label: "Program" }
        }}
      />
    </div>
  )
}