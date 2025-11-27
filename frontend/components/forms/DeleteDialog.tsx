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
import { Loader2 } from "lucide-react"

interface DeleteDialogProps {
  onConfirm: () => Promise<{ error?: string; message?: string }> | void
  itemName?: string
  onSuccess?: () => void
}

export function DeleteDialog({ onConfirm, itemName, onSuccess }: DeleteDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const result = await onConfirm()

      if (result?.error) {
        showToast(result.error || "Failed to delete item.")
      } else {
        showToast(result?.message || "✅ Successfully deleted.")
        setOpen(false) // ✅ close only on success
        onSuccess?.()
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
        <div>
          Delete
        </div>
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
            className="flex items-center gap-2 justify-center"
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            {loading ? "Deleting..." : "Delete"}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
