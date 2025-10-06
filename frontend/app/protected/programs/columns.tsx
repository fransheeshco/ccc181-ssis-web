"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { EditProgramDialog } from "@/components/forms/EditProgramDialog"
import { DeleteDialog } from "@/components/forms/DeleteDialog"
import * as z from "zod"

import { Button } from "@/components/ui/button"

const ProgramSchema = z.object({
    program_name: z.string().min(1, "Program name is required"),
    program_code: z.string().min(1, "Program code is required"),
    college_code: z.string().min(1, "College code is required"),
})

export type Program = z.infer<typeof ProgramSchema>;

export const columns: ColumnDef<Program>[] = [
    {
        accessorKey: "program_code",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Program Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            label: "Program Code"
        }
    },
    {
        accessorKey: "program_name",
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
            label: "Program Name"
        }
    },
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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const program = row.original

            return (
                <>
                    <EditProgramDialog program={program} />
                    <DeleteDialog
                        itemName={program.program_code + ": " + program.program_name}
                        onConfirm={() => console.log("Delete program:", program.program_code)}
                    />
                </>
            )
        },
    },
]