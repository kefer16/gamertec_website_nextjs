"use client";

import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { BrandApi } from "../api/brand/brand.api";
import { BrandResponseDto } from "../api/brand/dto/responses/brand.response.dto";
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export const columns: ColumnDef<BrandResponseDto>[] = [
   {
      id: "select",
      header: ({ table }) => (
         <Checkbox
            checked={
               table.getIsAllPageRowsSelected() ||
               (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
               table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
         />
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "short_name",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Nombre Corto
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => (
         <div className="lowercase">{row.getValue("short_name")}</div>
      ),
   },
   {
      accessorKey: "full_name",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Nombre Completo
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => (
         <div className="lowercase">{row.getValue("full_name")}</div>
      ),
   },
   {
      accessorKey: "is_active",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Estado
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => (
         <div className="lowercase">
            {row.getValue("is_active") ? "activo" : "inactivo"}
         </div>
      ),
   },
   {
      accessorKey: "creation_date",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Fecha Creación
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => (
         <div className="lowercase">{row.getValue("creation_date")}</div>
      ),
   },
];

export default function Page() {
   const [sorting, setSorting] = useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
      {}
   );
   const [rowSelection, setRowSelection] = useState({});
   const [data, setData] = useState<BrandResponseDto[]>([]);

   const getBrans = async () => {
      const apiBrand = new BrandApi();
      await apiBrand
         .getMany()
         .then((resp) => {
            console.log(resp);

            setData(resp);
         })
         .catch((error) => {
            console.log(error.message);
         });
   };

   useEffect(() => {
      getBrans();
   }, []);

   const onSubmit = () => {};
   const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection,
      },
   });
   const form = useForm();
   return (
      <div className="flex flex-col">
         <div className="w-full max-w-[1440px] mx-auto">
            <h1>Brand</h1>

            <div className="w-full">
               <div className="flex items-center py-4">
                  <Input
                     placeholder="Filter emails..."
                     value={
                        (table
                           .getColumn("full_name")
                           ?.getFilterValue() as string) ?? ""
                     }
                     onChange={(event) =>
                        table
                           .getColumn("full_name")
                           ?.setFilterValue(event.target.value)
                     }
                     className="max-w-sm"
                  />
                  <div className="flex gap-2">
                     <Button onClick={getBrans}>Añadir</Button>
                     <Button onClick={getBrans}>Actualizar</Button>
                     <Button onClick={getBrans}>Eliminar</Button>
                     <Button onClick={getBrans}>Historial</Button>
                  </div>

                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                           Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                              );
                           })}
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
               <div className="rounded-md border">
                  <Table>
                     <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                           <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map((header) => {
                                 return (
                                    <TableHead key={header.id}>
                                       {header.isPlaceholder
                                          ? null
                                          : flexRender(
                                               header.column.columnDef.header,
                                               header.getContext()
                                            )}
                                    </TableHead>
                                 );
                              })}
                           </TableRow>
                        ))}
                     </TableHeader>
                     <TableBody>
                        {table.getRowModel().rows?.length ? (
                           table.getRowModel().rows.map((row) => (
                              <TableRow
                                 key={row.id}
                                 data-state={row.getIsSelected() && "selected"}
                              >
                                 {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                       {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                       )}
                                    </TableCell>
                                 ))}
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={columns.length}
                                 className="h-24 text-center"
                              >
                                 No results.
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </div>
               <div className="flex items-center justify-end space-x-2 py-4">
                  <div className="flex-1 text-sm text-muted-foreground">
                     {table.getFilteredSelectedRowModel().rows.length} of
                     {table.getFilteredRowModel().rows.length} row(s) selected.
                  </div>
                  <div className="space-x-2">
                     <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                     >
                        Previous
                     </Button>
                     <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                     >
                        Next
                     </Button>
                  </div>
               </div>
            </div>
         </div>
         <Drawer>
            <DrawerTrigger asChild>
               <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
               <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                     <DrawerTitle>Move Goal</DrawerTitle>
                     <DrawerDescription>
                        Set your daily activity goal.
                     </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                     <Form {...form}>
                        <form
                           onSubmit={form.handleSubmit(onSubmit)}
                           className="space-y-8"
                        >
                           <FormField
                              control={form.control}
                              name="username"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                       <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                       This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <Button type="submit">Submit</Button>
                        </form>
                     </Form>
                  </div>
                  <DrawerFooter>
                     <Button>Guardar</Button>
                     <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                     </DrawerClose>
                  </DrawerFooter>
               </div>
            </DrawerContent>
         </Drawer>
      </div>
   );
}
