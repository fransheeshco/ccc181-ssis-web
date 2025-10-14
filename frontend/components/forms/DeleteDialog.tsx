"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { showToast } from "@/lib/toast"
import { Trash } from "lucide-react"

interface DeleteDialogProps {
  onConfirm: () => Promise<{ error?: string; message?: string }> | void
  itemName?: string
}

export function DeleteDialog({ onConfirm, itemName }: DeleteDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const result = await onConfirm() // await response from delete API
      console.log(result)
      
      if (result && "error" in result) {
        showToast(result.error || "❌ Failed to delete item.")
      } else {
        showToast(result?.message || "✅ Successfully deleted.")
        setOpen(false)
      }
    } catch (err) {
      console.error("DeleteDialog error:", err)
      showToast("❌ An unexpected error occurred.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="m-2">
        <Button variant="destructive">
          <Trash className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {itemName ?? "this item"}.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
