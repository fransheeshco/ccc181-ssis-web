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
import { ListFilter } from "lucide-react"

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
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <InputWithButton/>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full justify-start sm:w-auto"
            >
              <ListFilter className="mr-2 h-4 w-4" />
              {selectedColumnId ? `${selectedColumnId}` : "Filter by"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            {table
              .getAllColumns()
              .filter((column) => column.id !== "actions")
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

      {Comp && (
        <div className="flex justify-end">
          <Comp {...(component?.props || {})} />
        </div>
      )}
    </div>
  )
}