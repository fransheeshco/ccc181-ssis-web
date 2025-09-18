import { columns, Student } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { AddStudentDialog } from "@/components/forms/AddStudentDialogue"
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
      <section className="text-6xl font-bold">Student Management</section>

      <DataTable
        columns={columns}
        data={data}
        toolBarComponent={{
          Component: AddStudentDialog,
          props: { label: "Student" }
        }}
      />
    </div>
  )
}