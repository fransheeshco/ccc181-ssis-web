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
import { Edit, Loader2 } from "lucide-react"
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
  onSuccess?: () => void
}

export function EditProgramDialog({ program, onSuccess }: EditProgramDialogProps) {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false) // Confirmation state
  const [pendingValues, setPendingValues] = useState<ProgramForm | null>(null) // Store values awaiting confirmation
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

  // Actual submit
  async function onSubmit(values: ProgramForm) {
    setLoading(true)
    setError("")
    try {
      await updateProgram({ ...values, curr_code: program.program_code })
      showToast("Program edited successfully.", "success")
      setOpen(false)
      setConfirmOpen(false)
      setPendingValues(null)
      if (onSuccess) onSuccess()
    } catch (err: any) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  // Trigger confirmation
  function handleFormSubmit(values: ProgramForm) {
    setPendingValues(values)
    setConfirmOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="m-2">
          <div>Edit</div>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
            <DialogDescription>
              Fill in the form to edit program information.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="program_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Program Code" {...field} disabled={loading} />
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
                      <Input placeholder="Enter program name" {...field} disabled={loading} />
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
                    {loading && colleges.length === 0 ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="animate-spin h-5 w-5 text-gray-600" />
                      </div>
                    ) : (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a college" />
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
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                >
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
              Are you sure you want to update the program <strong>{program.program_code} - {program.program_name}</strong>?
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
