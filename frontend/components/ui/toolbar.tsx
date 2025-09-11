"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { InputWithButton } from "@/components/ui/InputWithButton"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table } from "@tanstack/react-table"
import { usePathname } from "next/navigation"
import { AddStudentDialog } from "@/components/AddStudentDialogue"
import { AddCollegeDialogue } from "@/components/AddCollegeDialog"
import { AddProgramDialog } from "@/components/AddProgramDialog"

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  children?: React.ReactNode
}

export function DataTableToolbar<TData>({
  table,
  children
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex w-full justify-between items-center py-4">
      <InputWithButton />
      <div className="flex gap-3">
        {children}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter By:
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}