"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { showToast } from "@/lib/toast"
import { updateProgram } from "@/lib/ProgramApi"
import { College } from "@/lib/types/collegeTypes"
import { getAllColleges } from "@/lib/CollegeApi"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogTrigger
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

const formSchema = z.object({
  program_code: z.string().min(1),
  program_name: z.string().min(1),
  college_code: z.string().min(1),
})

type ProgramForm = z.infer<typeof formSchema>

interface EditProgramDialogProps {
  program: ProgramForm
  onSuccess?: () => void // ✅ for parent refetch
}

export function EditProgramDialog({ program, onSuccess }: EditProgramDialogProps) {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")

  const form = useForm<ProgramForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program_code: "",
      program_name: "",
      college_code: "",
    },
  })

  // Load form values when program changes
  useEffect(() => {
    if (program) {
      form.reset({
        college_code: program.college_code,
        program_name: program.program_name,
        program_code: program.program_code,
      })
    }
  }, [program, form])

  // Fetch colleges
  async function fetchColleges() {
    try {
      setLoading(true)
      const collegeData = await getAllColleges()
      setColleges(collegeData)
      if (collegeData.length > 0 && !form.getValues().college_code) {
        form.setValue("college_code", collegeData[0].college_code)
      }
    } catch (error) {
      showToast(`Error fetching colleges: ${error}`, "warning")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) fetchColleges()
  }, [open])

  // Submit handler
  async function onSubmit(values: ProgramForm) {
    try {
      await updateProgram({ ...values, curr_code: program.program_code })
      showToast("Program edited successfully.", "success")
      setOpen(false)
      if (onSuccess) onSuccess() // ✅ trigger parent refresh
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
          <DialogTitle>Edit Program</DialogTitle>
          <DialogDescription>
            Fill in the form to edit program information.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="program_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Program Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="program_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter program name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="college_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={loading ? "Loading colleges..." : "Select a college"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem key={college.college_code} value={college.college_code}>
                          {college.college_code} - {college.college_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
