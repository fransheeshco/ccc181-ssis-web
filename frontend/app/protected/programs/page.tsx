import { columns, Program } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { AddProgramDialog } from "@/components/forms/AddProgramDialog"
import { cookies } from "next/headers"

async function getData(): Promise<Program[]> {
  const cookieStore = await cookies();            // get cookies from incoming request
  const cookieHeader = await cookieStore.toString(); // format as "key=value; key2=value2"

  const response = await fetch("http://localhost:8000/api/programs/", {
    cache: "no-store",
    headers: {  
      "Content-Type": "application/json",
      "Cookie": cookieHeader, // forward cookies to Flask
    },
  });


  const data = await response.json()
  console.log(data)
  return data
}

export default async function DemoPage() {
  const data: Program[] = await getData()

  return (
    <div className="container mx-auto">
      <section className="text-6xl font-bold">Program Management</section>
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