"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  OnChangeFn
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTableToolbar } from "@/components/ui/toolbar"
import { Button } from "@/components/ui/button"

export interface ActionComponent {
  Component: React.ComponentType<any>
  props?: Record<string, any>
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  total: number
  pageIndex: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  onSortingChange?: OnChangeFn<SortingState>
  sorting: SortingState
  onSearch?: (query: string) => void
  actions?: ActionComponent[]
  toolBarComponent?: {
    Component: React.ComponentType<any>
    props?: Record<string, any>
  }
}

export function DataTable<TData>({
  columns,
  data,
  total,
  pageIndex,
  pageSize,
  onPageChange,
  sorting,
  onSortingChange,
  toolBarComponent,
  actions = [],
  onSearch
}: DataTableProps<TData>) {
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount: Math.ceil(total / pageSize),
    onSortingChange, // 🔥 controlled from parent
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
    }
  })

  return (
    <div className="w-full flex-1">
      {/* Toolbar */}
      <DataTableToolbar table={table} actions={actions} onSearch={onSearch}  />

      {/* Table */}
      <div className="h-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="bg-gray-100" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>
        <span>
          Page {pageIndex + 1} of {Math.ceil(total / pageSize) || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pageIndex + 1 >= Math.ceil(total / pageSize)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
