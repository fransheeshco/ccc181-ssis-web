import { cookies } from "next/headers";
import { columns, College } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { AddCollegeDialogue } from "@/components/forms/AddCollegeDialog";

async function getData(): Promise<College[]> {
  const cookieStore = await cookies();            // get cookies from incoming request
  const cookieHeader = await cookieStore.toString(); // format as "key=value; key2=value2"

  const response = await fetch("http://localhost:8000/api/colleges/", {
    cache: "no-store",
    headers: {  
      "Content-Type": "application/json",
      "Cookie": cookieHeader, // forward cookies to Flask
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
}

export default async function DemoPage() {
  const data = await getData();

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
  );
}
