"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { EditProgramDialog } from "@/components/forms/EditProgramDialog"
import { DeleteDialog } from "@/components/forms/DeleteDialog"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"

const ProgramSchema = z.object({
    program_name: z.string().min(1, "Program name is required"),
    program_code: z.string().min(1, "Program code is required"),
    college_code: z.string().min(1, "College code is required"),
})

import { deleteProgram } from "@/lib/ProgramApi"

export type Program = z.infer<typeof ProgramSchema>;

export const columns = (fetchData: () => void): ColumnDef<Program>[] => [
    {
        accessorKey: "program_code",
        size: 140,
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
        size: 180,
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
        meta: {
            label: "College Code"
        },
        cell: ({ row }) => {
            const college = row.getValue<string>("college_code");
            return college && college.trim() !== "" ? college : "N/A";
        }
    },
    {
        id: "actions",
        header: "Actions",
        size: 70,
        cell: ({ row }) => {
            const program = row.original

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100">
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem asChild>
                                <EditProgramDialog program={program} onSuccess={fetchData} />
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteDialog
                                    itemName={`${program.program_code}: ${program.program_name}`}
                                    onConfirm={async () => {
                                        const result = await deleteProgram(program);
                                        return result; // this will be { message: "..."} or { error: "..." }
                                    }}
                                    onSuccess={fetchData}
                                />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    },
]