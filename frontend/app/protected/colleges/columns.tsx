"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { EditCollegeDialogue } from "@/components/forms/EditCollegeDialog"
import { DeleteDialog } from "@/components/forms/DeleteDialog"
import { deleteCollege } from "@/lib/CollegeApi"
import * as z from "zod"
import { Button } from "@/components/ui/button"

export const collegeSchema = z.object({
    college_code: z.string().min(1, "College code is required"),
    college_name: z.string().min(1, "College name is required"),
})

export type College = z.infer<typeof collegeSchema>

export const columns = (fetchData: () => void): ColumnDef<College>[] => [
    {
        accessorKey: "college_code",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                College Code
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: { label: "College Code" },
    },
    {
        accessorKey: "college_name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                College Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: { label: "College Name" },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const college = row.original

            return (
                <>
                    <EditCollegeDialogue college={college} onSuccess={fetchData} />
                    <DeleteDialog
                        itemName={`${college.college_code}: ${college.college_name}`}
                        onConfirm={async () => {
                            const result = await deleteCollege(college)
                            return result
                        }}
                        onSuccess={fetchData} // ✅ refresh table after delete
                    />
                </>
            )
        },
    },
]
