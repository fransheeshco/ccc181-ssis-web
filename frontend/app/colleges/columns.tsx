"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { EditCollegeDialogue } from "@/components/forms/EditCollegeDialog"
import { DeleteDialog } from "@/components/forms/DeleteDialog"
import { useCollegeContext } from "../context/collegeContext"
import * as z from "zod"

import { Button } from "@/components/ui/button"

export const collegeSchema = z.object({
    college_code: z.string().min(1, "College code is required"),
    college_name: z.string().min(1, "College name is required"),
})

export type College = z.infer<typeof collegeSchema>;

export const columns: ColumnDef<College>[] = [
    {
        accessorKey: "college_code",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    College Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            label: "College Code"
        }
    },
    {
        accessorKey: "college_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >College Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            label: "College Name"
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { deleteCollege } = useCollegeContext()
            const college = row.original

            return (
                <>
                    <EditCollegeDialogue college={college} />
                    <DeleteDialog
                        itemName={college.college_code + ": " + college.college_name}
                        onConfirm={() => deleteCollege(college.college_code)}
                    />
                </>
            )
        },
    },
]