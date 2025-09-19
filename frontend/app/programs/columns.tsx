"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Delete, MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { EditProgramDialog } from "@/components/forms/EditProgramDialog"
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

export type Program = {
    programName: string
    programCode: string
    collegeCode: string
}

export const columns: ColumnDef<Program>[] = [
    {
        accessorKey: "programCode",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Program Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            label: "Program Code"
        }
    },
    {
        accessorKey: "programName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Year Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            label: "Program Name"
        }
    },
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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const program = row.original

            return (
                <>
                    <EditProgramDialog program={program} />
                    <DeleteDialog
                        itemName={program.programCode + ": " + program.programName}
                        onConfirm={() => console.log("Delete program:", program.programCode)}
                    />
                </>
            )
        },
    },
]