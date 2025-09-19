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

const formSchema = z.object({
  collegeCode: z.string().min(1),
  collegeName: z.string().min(1),
})

interface AddCollegeDialogueProps {
  label: string
}

export function AddCollegeDialogue({ label }: AddCollegeDialogueProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegeCode: "CCS",
      collegeName: "College of Computer Studies",
    },
  })
  const [open, setOpen] = useState(false)

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setOpen(false)
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
          <span className="hidden sm:inline">{label}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add College</DialogTitle>
          <DialogDescription>Fill in the form to add a new College.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="collegeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter College Name" {...field} />
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
