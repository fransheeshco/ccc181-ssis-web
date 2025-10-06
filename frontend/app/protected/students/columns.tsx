"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { EditStudentDialog } from "@/components/forms/EditStudentDialog"
import { DeleteDialog } from "@/components/forms/DeleteDialog"
import * as z from 'zod'

import { Button } from "@/components/ui/button"

type StudentID = `${number}${number}${number}${number}-${number}${number}${number}${number}`;

export const studentSchema = z.object(
    {
        student_id: z.string().regex(/^\d{4}-\d{4}$/, "ID must be in YYYY-NNNN format"),
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        program: z.string(),
        year_level: z.number(),
        gender: z.string(),
    }
);

export type Student = z.infer<typeof studentSchema>;

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "student_id",
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
        accessorKey: "first_name",
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
        accessorKey: "last_name",
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
        accessorKey: "year_level",
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
                        itemName={student.student_id + ": " + student.last_name}
                        onConfirm={() => console.log("Delete Student:", student.student_id)}
                    />
                </>
            )
        },
    },
]