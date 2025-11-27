"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Edit } from "lucide-react"
import { z } from "zod"
import { updateCollege } from "@/lib/CollegeApi"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { showToast } from "@/lib/toast"
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
  new_college_code: z.string().min(1, "College code is required"),
  new_college_name: z.string().min(1, "College name is required"),
})

type FormValues = z.infer<typeof formSchema>

interface EditCollegeDialogueProps {
  college: { college_code: string; college_name: string }
  onSuccess?: () => void // ✅ optional refetch callback
}

export function EditCollegeDialogue({ college, onSuccess }: EditCollegeDialogueProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_college_code: "",
      new_college_name: "",
    },
  })

  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (college) {
      form.reset({
        new_college_code: college.college_code,
        new_college_name: college.college_name,
      })
    }
  }, [college, form])

  async function onSubmit(values: FormValues) {
    try {
      await updateCollege({
        curr_code: college.college_code,
        college_code: values.new_college_code,
        college_name: values.new_college_name,
      })

      showToast("College updated successfully!", "success")
      setOpen(false)

      // ✅ Trigger refetch after update
      if (onSuccess) onSuccess()
    } catch (err: any) {
      setError(err.message || String(err))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="m-2">
        <div>
          Edit
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit College</DialogTitle>
          <DialogDescription>
            Editing <strong>{college.college_code}</strong>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="new_college_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New College Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_college_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New College Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
