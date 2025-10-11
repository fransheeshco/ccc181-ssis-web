"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
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
import { createStudent } from "@/lib/StudentApi"
import { showToast } from "@/lib/toast"

const formSchema = z.object({
  student_id: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  program_code: z.string().min(1),
  year_level: z.string().min(1),
  gender: z.string().min(1),
})

interface AddStudentDialogProps {
  label: string
}

export function AddStudentDialog({ label }: AddStudentDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: "",
      first_name: "John",
      last_name: "Doe",
      program_code: "College",
      year_level: "1",
      gender: "Male",
    },
  })
  const [open, setOpen] = useState(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createStudent(values)
      showToast("Student Added Successfully", 'success')
      setOpen(false)
    } catch (error) {
      showToast(`Error: ${error}`, 'warning')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* FAB on mobile, normal button on desktop */}
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
          Add Student
          <span className="hidden sm:inline">{label}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>Fill in the form to add a new student.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="student_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ID number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="program_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter program" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter year level"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter gender" {...field} />
                  </FormControl>
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
