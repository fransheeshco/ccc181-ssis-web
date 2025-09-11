"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"


const formSchema = z.object({
    programCode: z.string().min(1),
    programName: z.string().min(1),
    collegeCode: z.string().min(1),
})

interface AddStudentDialogProps {
  label: string
}

export function AddProgramDialog({ label }: AddStudentDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programCode: "BSCS",
      programName: "Bachelors of Science in Computer Science",
      collegeCode: "CCS"
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="my-auto p-6">Add Program</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Program</DialogTitle>
          <DialogDescription>Fill in the form to add a new Program.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="programCode"
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
              name="programName"
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
              name="collegeCode"
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
