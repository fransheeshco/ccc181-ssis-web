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

interface ActionComponent {
  Component: React.ComponentType<any>
  props?: Record<string, any>
}

interface ExtraComponent {
  Component: React.ComponentType<any>
  props?: Record<string, any>
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  actions?: ActionComponent[]
  onSearch?: (query: string) => void
  component?: ExtraComponent
}

export function DataTableToolbar<TData>({
  table,
  component,
  onSearch,
  actions = [],
}: DataTableToolbarProps<TData>) {
  const Comp = component?.Component
  const [selectedColumnId, setSelectedColumnId] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left Side: Search + Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <InputWithButton 
          onSearch={onSearch || (() => {})} 
        />

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
                  (column.columnDef.meta as any)?.label || column.id
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={selectedColumnId === header}
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

      {/* Right Side: Extra Component + Actions */}
      <div className="flex gap-2">
        {Comp && <Comp {...(component?.props || {})} />}
        {actions.map(({ Component, props }, i) => (
          <Component key={i} {...(props || {})} />
        ))}
      </div>
    </div>
  )
}
