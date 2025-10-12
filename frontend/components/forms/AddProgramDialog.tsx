"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { z } from "zod"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogTrigger
} from "@/components/ui/dialog"
import { createProgram } from "@/lib/ProgramApi"
import { getAllColleges } from "@/lib/CollegeApi"
import { showToast } from "@/lib/toast"
import { College } from "@/lib/types/collegeTypes"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  program_code: z.string().min(1),
  program_name: z.string().min(1),
  college_code: z.string().min(1),
})

interface AddProgramDialogProps {
  label: string
}

export function AddProgramDialog({ label }: AddProgramDialogProps) {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // Fetch colleges when dialog opens
  useEffect(() => {
    if (open) {
      fetchColleges()
    }
  }, [open])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program_code: "BSXX",
      program_name: "Bachelors of Science in ",
      college_code: "College"
    },
  })

  async function fetchColleges() {
    try {
      setLoading(true)
      const collegeData = await getAllColleges()
      setColleges(collegeData)

      // Auto-select first college if none selected
      if (collegeData.length > 0 && !form.getValues().college_code) {
        form.setValue('college_code', collegeData[0].college_code)
      }
    } catch (error) {
      showToast(`Error fetching colleges: ${error}`, 'warning')
    } finally {
      setLoading(false)
    }
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createProgram(values)
      showToast("Program Added Successfully", 'success')
      setOpen(false)
      form.reset()
    } catch (error) {
      showToast(`Error: ${error}`, 'warning')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="
            fixed bottom-4 left-4
            sm:static sm:bottom-auto sm:right-auto
            rounded-full sm:rounded-md
            h-14 w-14 sm:h-auto sm:w-auto
            p-0 sm:px-4 sm:py-2
            shadow-lg sm:shadow-none
            flex items-center justify-center gap-2
          "
        >
          <Plus className="h-6 w-6 sm:h-5 sm:w-5" />
          Add Program
          <span className="hidden sm:inline">{label}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Program</DialogTitle>
          <DialogDescription>Fill in the form to add a new Program.</DialogDescription>
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
                    <Input placeholder="Enter Program Name" {...field} />
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
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={loading ? "Loading colleges..." : "Select a college"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem 
                          key={college.college_code} 
                          value={college.college_code}
                        >
                          {college.college_code} - {college.college_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
