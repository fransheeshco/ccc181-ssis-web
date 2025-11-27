"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { EditStudentDialog } from "@/components/forms/EditStudentDialog"
import { DeleteDialog } from "@/components/forms/DeleteDialog"
import { ViewStudentModal } from "@/components/forms/ViewStudentCard"
import * as z from 'zod'
import { deleteStudent } from "@/lib/StudentApi"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"


type StudentID = `${number}${number}${number}${number}-${number}${number}${number}${number}`;

export const studentSchema = z.object(
    {
        student_id: z.string().regex(/^\d{4}-\d{4}$/, "ID must be in YYYY-NNNN format"),
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        program_code: z.string(),
        year_level: z.string(),
        gender: z.string(),
    }
);

export type Student = z.infer<typeof studentSchema>;

export const columns = (fetchData: () => void): ColumnDef<Student>[] => [
    {
        id: "student_photo",
        header: () => <div>Student Photo</div>,
        size: 80,
        minSize: 80,
        meta: { label: "Student Photo", align: "center" },
        cell: ({ row }) => {
            const student = row.original as Student & { photo_url?: string };

            const defaultPhoto =
                "https://gromnlgzvpnkbzlvefrw.supabase.co/storage/v1/object/public/student_photos/default_student_photo.png";

            const imgSrc = student.photo_url && student.photo_url.trim() !== ""
                ? student.photo_url
                : defaultPhoto;

            return (
                <img
                    src={imgSrc}
                    alt={`${student.first_name} ${student.last_name}`}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                        // fallback in case the Supabase image fails to load
                        (e.target as HTMLImageElement).src = defaultPhoto;
                    }}
                />
            );
        },
    },
    {
        accessorKey: "student_id",
        size: 140,
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
            label: "ID Number",
            align: "center"
        }
    },
    {
        accessorKey: "first_name",
        size: 150,
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
            label: "First Name",
            align: "center"
        }
    },
    {
        accessorKey: "last_name",
        size: 150,
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
            label: "Last Name",
            align: "center"
        }
    },
    {
        accessorKey: "program_code",
        size: 120,
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Program
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        meta: {
            label: "Program",
            align: "center"
        },
        cell: ({ row }) => {
            const program = row.getValue<string>("program_code");
            return program && program.trim() !== "" ? program : "N/A";
        }
    },
    {
        accessorKey: "year_level",
        size: 90,
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
            label: "Year Level",
            align: "center"
        }
    },
    {
        accessorKey: "gender",
        size: 90,
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
            label: "Gender",
            align: "center"
        }
    },
    {
        id: "actions",
        header: "Actions",
        size: 70,
        meta: { align: "center" },
        cell: ({ row }) => {
            const student = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100">
                            <MoreHorizontal className="h-5 w-5" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-40">

                        {/* VIEW */}
                        <DropdownMenuItem asChild>
                            <ViewStudentModal student={student} />
                        </DropdownMenuItem>

                        {/* EDIT */}
                        <DropdownMenuItem asChild>
                            <EditStudentDialog
                                student={{ ...student, curr_code: student.student_id }}
                                onSuccess={fetchData}
                            />
                        </DropdownMenuItem>

                        {/* DELETE */}
                        <DropdownMenuItem asChild>
                            <DeleteDialog
                                itemName={`${student.student_id}: ${student.last_name}`}
                                onConfirm={async () => await deleteStudent(student)}
                                onSuccess={fetchData}
                            />
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }

]