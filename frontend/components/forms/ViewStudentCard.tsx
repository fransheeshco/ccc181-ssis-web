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
import { useState } from "react"

export function ViewStudentModal({ student }: { student: any }) {
  const defaultPhoto =
    "https://gromnlgzvpnkbzlvefrw.supabase.co/storage/v1/object/public/student_photos/default_student_photo.png"

  // Choose final display source
  const imgSrc =
    student.photo_url && student.photo_url.trim() !== ""
      ? student.photo_url
      : defaultPhoto

  return (
    <Dialog>
      <DialogTrigger asChild className="m-2">
        <div>View</div>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-semibold">
            Student Details
          </DialogTitle>
        </DialogHeader>

        {/* Photo */}
        <div className="flex justify-center my-4">
          <div className="h-32 w-32 rounded-full overflow-hidden border">
            <img
              src={imgSrc}
              alt="Student photo"
              className="w-32 h-32 rounded-full object-cover border"
            />
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
