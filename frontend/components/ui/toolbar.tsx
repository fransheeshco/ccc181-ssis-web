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

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  component?: {
    Component: React.ComponentType<any>
    props?: Record<string, any>
  }
}

export function DataTableToolbar<TData>({
  table,
  component
}: DataTableToolbarProps<TData>) {
  const Comp = component?.Component
  const [selectedColumnId, setSelectedColumnId] = React.useState<string | null>(null)

  return (
   <div className="flex w-full items-center justify-between py-4">
  <div className="flex items-center gap-3">
    <InputWithButton />

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {selectedColumnId ? `${selectedColumnId}` : "Filter By:"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            const header =
              (column.columnDef.meta as any)?.label || column.id;
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={selectedColumnId === column.columnDef.header}
                onCheckedChange={(value) => {
                  if (value) {
                    setSelectedColumnId(header)
                  } else {
                    setSelectedColumnId(null)
                  }
                }}
              >
                {header}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  {Comp && <Comp {...(component ?? {})} />}
</div>

  )
}