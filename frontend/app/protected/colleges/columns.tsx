"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { EditCollegeDialogue } from "@/components/forms/EditCollegeDialog"
import { DeleteDialog } from "@/components/forms/DeleteDialog"
import { deleteCollege } from "@/lib/CollegeApi"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"

export const collegeSchema = z.object({
    college_code: z.string().min(1, "College code is required"),
    college_name: z.string().min(1, "College name is required"),
})

export type College = z.infer<typeof collegeSchema>

export const columns = (fetchData: () => void): ColumnDef<College>[] => [
    {
        accessorKey: "college_code",
        size: 140,
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
        size: 200,
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
        size: 70,
        cell: ({ row }) => {
            const college = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100">
                            <MoreHorizontal className="h-5 w-5" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-40">

                        {/* EDIT */}
                        <DropdownMenuItem asChild>
                            <EditCollegeDialogue
                                college={college}
                                onSuccess={fetchData}
                            />
                        </DropdownMenuItem>

                        {/* DELETE */}
                        <DropdownMenuItem asChild>
                            <DeleteDialog
                                itemName={`${college.college_code}: ${college.college_name}`}
                                onConfirm={async () => await deleteCollege(college)}
                                onSuccess={fetchData}
                            />
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }

]
