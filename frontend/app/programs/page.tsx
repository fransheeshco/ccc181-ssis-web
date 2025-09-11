import { columns, Program } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { AddProgramDialog } from "@/components/AddProgramDialog"

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
  const data = await getData()

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between">
        <section className="text-6xl">Program Management</section>
        <AddProgramDialog label="Program"/>
      </div>
      <DataTable columns={columns} data={data} /> 
    </div>
  )
}