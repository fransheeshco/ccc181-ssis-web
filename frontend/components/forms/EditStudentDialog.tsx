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

import { Loader2 } from "lucide-react" 
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog"
import { updateStudent } from "@/lib/StudentApi"
import { showToast } from "@/lib/toast"

const formSchema = z.object({
  student_id: z.string().regex(/^\d{4}-\d{4}$/, "ID must be in YYYY-NNNN format"),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  program_code: z.string().min(1),
  year_level: z.string().min(1),
  gender: z.string().min(1),
  curr_code: z.string().min(1),
})

type StudentForm = z.infer<typeof formSchema>

interface EditStudentDialogProps {
  student: StudentForm & { photo_url?: string }
  onSuccess?: () => void
}

export function EditStudentDialog({ student, onSuccess }: EditStudentDialogProps) {
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false) // Confirmation dialog state
  const [pendingValues, setPendingValues] = useState<StudentForm | null>(null)
  const [loading, setLoading] = useState(false)
  const [programs, setPrograms] = useState<Program[]>([])
  const [error, setError] = useState("")
  const [removePhoto, setRemovePhoto] = useState(false)

  const defaultPhoto =
    "https://gromnlgzvpnkbzlvefrw.supabase.co/storage/v1/object/public/student_photos/defaultphoto.jpg"

  const form = useForm<StudentForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: "",
      first_name: "",
      last_name: "",
      program_code: "",
      year_level: "",
      gender: "",
      curr_code: "",
    },
  })

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null
    setPhotoFile(file)
    setRemovePhoto(false)
    setPreviewSrc(file ? URL.createObjectURL(file) : null)
  }

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

  useEffect(() => {
    if (student && open) {
      form.reset({
        student_id: student.student_id,
        first_name: student.first_name,
        last_name: student.last_name,
        program_code: student.program_code,
        year_level: student.year_level,
        gender: student.gender,
        curr_code: student.student_id,
      })
      setPreviewSrc(null)
      setPhotoFile(null)
      setRemovePhoto(false)
    }
  }, [student, open, form])

  // Actual submission
  async function onSubmit(values: StudentForm) {
    try {
      setLoading(true)
      const payload = {
        ...values,
        curr_code: student.student_id,
        remove_photo: removePhoto,
      }
      await updateStudent(payload, photoFile ?? undefined)
      showToast("Student edited successfully.", "success")
      setOpen(false)
      setConfirmOpen(false)
      setPendingValues(null)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  // Handle form submit -> open confirmation
  function handleFormSubmit(values: StudentForm) {
    setPendingValues(values)
    setConfirmOpen(true)
  }

  const displayedPhoto =
    previewSrc || (!removePhoto && student.photo_url) || defaultPhoto

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="m-2">
          <div>Edit</div>
        </DialogTrigger>

        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>Fill in the form to edit student information.</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={displayedPhoto}
                  alt="Student photo"
                  className="w-32 h-32 rounded-full object-cover border"
                />

                {(previewSrc || student.photo_url) && !removePhoto && (
                  <Button
                    type="button"
                    variant="outline"
                    className="text-red-600 border-red-400"
                    onClick={() => {
                      setPhotoFile(null)
                      setPreviewSrc(null)
                      setRemovePhoto(true)
                    }}
                  >
                    Remove Photo
                  </Button>
                )}

                <FormLabel>Upload New Photo</FormLabel>
                <FormControl>
                  <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {photoFile ? photoFile.name : "Upload Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </FormControl>
              </div>

              {/* Student fields */}
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="gender" render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <DialogFooter>
                <Button type="submit">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to update the student <strong>{student.student_id} - {student.last_name}, {student.first_name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            <Button
              variant="outline"
              onClick={() => {
                setConfirmOpen(false)
                setPendingValues(null)
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (pendingValues) onSubmit(pendingValues)
              }}
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin h-4 w-4" />}
              {loading ? "Loading..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
