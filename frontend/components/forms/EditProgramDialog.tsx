"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { success, z } from "zod"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { showToast } from "@/lib/toast"
import { updateProgram } from "@/lib/ProgramApi"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"


const formSchema = z.object({
  program_code: z.string().min(1),
  program_name: z.string().min(1),
  college_code: z.string().min(1),
})

type Program = z.infer<typeof formSchema>

export function EditProgramDialog({ program }: { program: Program }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program_code: "BSCS",
      program_name: "Bachelors of Science in Computer Science",
      college_code: "CCS",
    },
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (program) {
      form.reset({
        college_code: program.college_code,
        program_name: program.program_name,
        program_code: program.program_code,
      })
    }
  }, [program, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateProgram({...values, curr_code: program.program_code})
      showToast('Program Edited Successfully', 'success')
      setOpen(false)  
    } catch (error) {
      showToast(`Error: ${error}`, 'warning')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="m-2">
          <Button><Edit className="h-6 w-6"/></Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Program</DialogTitle>
          <DialogDescription>Fill in the form to edit program information.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
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
                  <FormLabel>College Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter College Code" {...field} />
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
