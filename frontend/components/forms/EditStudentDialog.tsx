"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getAllPrograms } from "@/lib/ProgramApi"
import { Program } from "@/lib/types/programTypes"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { updateStudent } from "@/lib/StudentApi"
import { showToast } from "@/lib/toast"

const formSchema = z.object({
  student_id: z.string().regex(/^\d{4}-\d{4}$/, "ID must be in YYYY-NNNN format"),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  program_code: z.string().min(1),
  year_level: z.string().min(1),
  gender: z.string().min(1),
})

type StudentForm = z.infer<typeof formSchema>

interface EditStudentDialogProps {
  student: StudentForm
  onSuccess?: () => void // ✅ parent refetch
}

export function EditStudentDialog({ student, onSuccess }: EditStudentDialogProps) {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [programs, setPrograms] = useState<Program[]>([])
  const [error, setError] = useState("")

  const form = useForm<StudentForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: "",
      first_name: "",
      last_name: "",
      program_code: "",
      year_level: "",
      gender: "",
    },
  })

  // ✅ Fetch programs when dialog opens
  useEffect(() => {
    if (open) fetchPrograms()
  }, [open])

  async function fetchPrograms() {
    try {
      setLoading(true)
      const programData = await getAllPrograms()
      setPrograms(programData || [])
    } catch (error) {
      showToast(`Error fetching programs: ${error}`, "warning")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Reset form when student changes or dialog opens
  useEffect(() => {
    if (student && open) {
      form.reset({
        student_id: student.student_id,
        first_name: student.first_name,
        last_name: student.last_name,
        program_code: student.program_code,
        year_level: student.year_level,
        gender: student.gender,
      })
    }
  }, [student, open, form])

  async function onSubmit(values: StudentForm) {
    try {
      await updateStudent({
        ...values,
        curr_code: student.student_id,
      })
      showToast("Student edited successfully.", "success")
      setOpen(false)
      if (onSuccess) onSuccess() // ✅ trigger parent refetch
    } catch (err: any) {
      setError(err.message || String(err))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="m-2">
        <Button><Edit className="h-6 w-6" /></Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Fill in the form to edit student information.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                       <div className="mb-2">
              <FormLabel>Photo</FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                />
              </FormControl>
            </div>

            <FormField control={form.control} name="student_id" render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl><Input placeholder="Enter ID number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="first_name" render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl><Input placeholder="Enter first name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="last_name" render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl><Input placeholder="Enter last name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="program_code" render={({ field }) => (
              <FormItem>
                <FormLabel>Program</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={loading ? "Loading programs..." : "Select a program"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.program_code} value={program.program_code}>
                        {program.program_code} - {program.program_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="year_level" render={({ field }) => (
              <FormItem>
                <FormLabel>Year Level</FormLabel>
                <FormControl><Input placeholder="Enter year level" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl><Input placeholder="Enter gender" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            <DialogFooter>
              <Button type="submit" disabled={loading}>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
