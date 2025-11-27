"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
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
  onSuccess?: () => void
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
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false) // New state for confirmation dialog
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null) // Store values awaiting confirmation

  useEffect(() => {
    if (college) {
      form.reset({
        new_college_code: college.college_code,
        new_college_name: college.college_name,
      })
    }
  }, [college, form])

  async function onSubmit(values: FormValues) {
    setLoading(true)
    setError("")
    try {
      await updateCollege({
        curr_code: college.college_code,
        college_code: values.new_college_code,
        college_name: values.new_college_name,
      })

      showToast("College updated successfully!", "success")
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

  function handleFormSubmit(values: FormValues) {
    setPendingValues(values)
    setConfirmOpen(true) // Open confirmation dialog
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="m-2">
          <div>Edit</div>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit College</DialogTitle>
            <DialogDescription>
              Editing <strong>{college.college_code}</strong>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="new_college_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New College Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter new code" {...field} disabled={loading} />
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
                      <Input placeholder="Enter new name" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 justify-center"
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
              Are you sure you want to update the college <strong>{college.college_code} - {college.college_name}</strong>?
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
