"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { EditCollegeDialogue } from "@/components/forms/EditCollegeDialog"
import { DeleteDialog } from "@/components/forms/DeleteDialog"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Checkbox } from "@/components/ui/checkbox"

export type College = {
    collegeCode: string
    collegeName: string
}

export const columns: ColumnDef<College>[] = [
    {
        accessorKey: "collegeCode",
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
        accessorKey: "collegeName",
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
            const college = row.original

            return (
                <>
                    <EditCollegeDialogue college={college} />
                    <DeleteDialog
                        itemName={college.collegeCode + ": " + college.collegeName}
                        onConfirm={() => console.log("Delete college:", college.collegeCode)}
                    />
                </>
            )
        },
    },
]