"use client";

import type {ColumnDef, Table as TTable, SortingState} from "@tanstack/react-table";

import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/shared/components/ui/select";
import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Data = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Value = any;

export interface DataTableProps<TData extends Data = Data, TValue extends Value = Value> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  pageSize?: number;
}

export function Pagination<TData extends Data = Data>({
  table,
  pageSize,
}: {
  table: TTable<TData>;
  pageSize: number;
}) {
  return (
    <div className="flex items-center justify-end gap-1 space-x-2 py-4">
      <Button
        disabled={!table.getCanPreviousPage()}
        size="icon"
        variant="ghost"
        onClick={() => {
          table.previousPage();
        }}
      >
        <ChevronLeftIcon />
      </Button>
      <span className="flex items-center gap-1 text-sm">
        <span>Página</span>
        <strong>
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </strong>
      </span>
      <Button
        disabled={!table.getCanNextPage()}
        size="icon"
        variant="ghost"
        onClick={() => {
          table.nextPage();
        }}
      >
        <ChevronRightIcon />
      </Button>
      <span className="flex items-center gap-1">
        <span>|</span>
        <span>Ir a la página:</span>
        <Input
          className="h-9 w-16 rounded-lg px-2 py-0"
          max={table.getPageCount()}
          min={1}
          type="number"
          value={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;

            table.setPageIndex(page);
          }}
        />
      </span>
      <div>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(+value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Show" />
            <SelectContent>
              {new Array(5).fill(0).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <SelectItem key={`row-show-${index}`} value={(10 * (index + 1)).toString()}>
                  Mostrar {10 * (index + 1)}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>
    </div>
  );
}

export function DataTable<TData extends Data = Data, TValue extends Value = Value>({
  data,
  columns,
  pageCount,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize,
  });

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const searchParams = React.useMemo(() => new URLSearchParams(params), [params]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: (paginationUpdater) => {
      setPagination(paginationUpdater);

      const {pageSize: limit, pageIndex: page} = (
        paginationUpdater as unknown as (old: typeof pagination) => typeof pagination
      )(pagination);

      searchParams.set("page", (page + 1).toString());
      searchParams.set("limit", limit.toString());

      router.push(`${pathname}?${searchParams.toString()}`);
    },
    onSortingChange: (sortingUpdater) => {
      setSorting(sortingUpdater);

      const newSorting = (sortingUpdater as unknown as (old: typeof sorting) => typeof sorting)(
        sorting,
      );

      newSorting.forEach((sort) => {
        searchParams.set(`sort[${sort.id}]`, sort.desc ? "desc" : "asc");
      });

      router.push(`${pathname}?${searchParams.toString()}`);
    },
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    const sortKeys = Array.from(searchParams.keys())
      .filter((key) => /^sort\[\w+\]$/.test(key))
      .map((key) => ({
        id: /\[(\w+)\]/.exec(key)?.[1],
        desc: searchParams.get(key) === "desc",
      }));

    setSorting(sortKeys as SortingState);
  }, [searchParams]);

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="!bg-white">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
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
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  No se han encontrado resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination pageSize={pagination.pageSize} table={table} />
    </div>
  );
}
