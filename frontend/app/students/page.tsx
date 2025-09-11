import { columns, Student } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { AddStudentDialog } from "@/components/AddStudentDialogue"
import { DataTableToolbar } from "@/components/ui/toolbar"

async function getData(): Promise<Student[]> {
  // Fetch data from your API here.
  return [
    {
      idNumber: "728ed52f",
      firstName: "Francis",
      lastName: "Cejas",
      program: "BSCS",
      gender: "Male",
      yearLevel: 2
    },
    {
      idNumber: "728ed52f",
      firstName: "Francis",
      lastName: "Cejas",
      program: "BSCS",
      gender: "Male",
      yearLevel: 2
    },
    {
      idNumber: "728ed52f",
      firstName: "Francis",
      lastName: "Cejas",
      program: "BSCS",
      gender: "Male",
      yearLevel: 2
    },
    {
      idNumber: "728ed52f",
      firstName: "Francis",
      lastName: "Cejas",
      program: "BSCS",
      gender: "Male",
      yearLevel: 2
    },
    {
      idNumber: "728ed52f",
      firstName: "Francis",
      lastName: "Cejas",
      program: "BSCS",
      gender: "Male",
      yearLevel: 2
    },
    {
      idNumber: "728ed52f",
      firstName: "Francis",
      lastName: "Cejas",
      program: "BSCS",
      gender: "Male",
      yearLevel: 2
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto">
      <div className="flex flex-row w-full justify-between">
        <section className="text-6xl">Student Management</section>
        <AddStudentDialog label="Students"/>
      </div>
      
      <DataTable columns={columns} data={data} />
    </div>
  )
}