"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { View } from "lucide-react"
import { useState } from "react"


export function ViewStudentModal({ student }: { student: any }) {
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    return (
        <Dialog>
            {/* Trigger button (you can replace this with an icon in your table) */}
            <DialogTrigger asChild className="m-2">
               <div>
                    View
               </div>
            </DialogTrigger>

            {/* Modal content */}
            <DialogContent className="max-w-md">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-xl font-semibold">
                        Student Details
                    </DialogTitle>
                </DialogHeader>

                {/* Photo */}
                <div className="flex justify-center my-4">
                    <div className="h-32 w-32 rounded-full overflow-hidden border">
                        {previewSrc ? (
                            <img
                                src={previewSrc}
                                alt="New photo preview"
                                className="w-32 h-32 rounded-full object-cover border"
                            />
                        ) : student.photo_url ? (
                            <img
                                src={student.photo_url}
                                alt="Current photo"
                                className="w-32 h-32 rounded-full object-cover border"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                No photo
                            </div>
                        )}
                    </div>
                </div>

                {/* Student Info */}
                <div className="grid gap-4">
                    <div className="grid gap-1">
                        <Label>Student ID: {student.student_id}</Label>
                    </div>

                    <div className="grid gap-1">
                        <Label>First Name: {student.first_name}</Label>
                    </div>

                    <div className="grid gap-1">
                        <Label>Last Name: {student.last_name}</Label>

                    </div>

                    <div className="grid gap-1">
                        <Label>Gender: {student.gender}</Label>
                    </div>

                    <div className="grid gap-1">
                        <Label>Year Level: {student.year_level}</Label>
                    </div>

                    <div className="grid gap-1">
                        <Label>Program: {student.program_code}</Label>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
