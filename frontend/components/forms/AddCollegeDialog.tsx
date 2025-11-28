"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { Plus } from "lucide-react"
import { createCollege, fetchColleges } from "@/lib/CollegeApi"
import { showToast } from "@/lib/toast"

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
  college_code: z.string().min(1),
  college_name: z.string().min(1),
})

interface AddCollegeDialogueProps {
  label: string,
  onSuccess?: () => void
}

export function AddCollegeDialog({ label, onSuccess }: AddCollegeDialogueProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      college_code: "",
      college_name: "",
    },
  })
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createCollege(values)
      showToast("College Added Successfully.", "success")
      setOpen(false)
      form.reset()
      if (onSuccess) onSuccess() 
    } catch (err: any) {
      console.error("API error:", err);
      setError(err.message || String(err));
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
            <FormField
              control={form.control}
              name="college_name"
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

            {/* ⚠️ Backend error message */}
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
