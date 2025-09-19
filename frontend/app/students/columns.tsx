"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { EditStudentDialog } from "@/components/forms/EditStudentDialog"
import { DeleteDialog } from "@/components/forms/DeleteDialog"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Student = {
    idNumber: string
    firstName: string
    lastName: string
    gender: string
    program: string
    yearLevel: number
}

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "idNumber",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            label: "ID Number"
        }
    },
    {
        accessorKey: "firstName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    First Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            label: "First Name"
        }
    },
    {
        accessorKey: "lastName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            label: "Last Name"
        }
    },
    {
        accessorKey: "program",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Program
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            label: "Program"
        }
    },
    {
        accessorKey: "yearLevel",
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
            label: "Year Level"
        }
    },
    {
        accessorKey: "gender",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Gender
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            label: "Gender"
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const student = row.original

            return (
                <>
                    <EditStudentDialog student={student} />
                    <DeleteDialog
                        itemName={student.idNumber + ": " + student.lastName}
                        onConfirm={() => console.log("Delete Student:", student.idNumber)}
                    />
                </>
            )
        },
    },
]