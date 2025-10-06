"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface InputWithButtonProps {
  placeholder?: string
  buttonLabel?: string
  onSearch: (value: string) => void
}

export function InputWithButton({
  placeholder = "Search ...",
  buttonLabel = "Search",
  onSearch,
}: InputWithButtonProps) {
  const [value, setValue] = useState("")

  const handleSubmit = () => {
    onSearch(value)
  }

  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          type="text" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="pl-8 w-full"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
      <Button onClick={handleSubmit}>{buttonLabel}</Button>
    </div>
  )
}
