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
import { FormEvent, useEffect, useState } from "react";
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
import { FormSubmitHandler, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
   CalendarPlus as CalendarPlusIcon,
   CalendarClock as CalendarClockIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { on } from "events";
import { Separator } from "@/components/ui/separator";
import { CreateOneBrandRequestDto } from "../api/brand/dto/requests/create-one-brand.request.dto";
import { StatusForm } from "@/lib/enum/status-form";
import { UpdateOneBrandRequestDto } from "../api/brand/dto/requests/update-one-brand.request.dto";

export const columns: ColumnDef<BrandResponseDto>[] = [
   {
      accessorKey: "brand_id",
      header: ({ column }) => {
         return <div>#</div>;
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
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
      cell: ({ row }) => <div>{row.getValue("short_name")}</div>,
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
      cell: ({ row }) => <div>{row.getValue("full_name")}</div>,
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
         <div className="uppercase">
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
   const [brandId, setBrandId] = useState<string>("");
   const [shortName, setShortName] = useState<string>("");
   const [fullName, setFullName] = useState<string>("");
   const [creationDate, setCreationDate] = useState<Date>(new Date());
   const [isActive, setIsActive] = useState<boolean>(false);
   const [statusForm, setStatusForm] = useState<StatusForm>(StatusForm.VIEW);

   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const srvBrand = new BrandApi();
      if (statusForm === StatusForm.ADD) {
         const _data: CreateOneBrandRequestDto = {
            creation_date: creationDate.toISOString(),
            full_name: fullName,
            is_active: isActive,
            short_name: shortName,
         };
         await srvBrand
            .createOne(_data)
            .then((pResp: BrandResponseDto) => {
               const _resp = data;
               _resp.unshift(pResp);
               setData([..._resp]);
            })
            .catch((error: Error) => {
               console.log(error.message);
            });
      }
      if (statusForm === StatusForm.UPDATE) {
         const _data: UpdateOneBrandRequestDto = {
            full_name: fullName,
            is_active: isActive,
            short_name: shortName,
         };
         await srvBrand
            .updateOne(brandId, _data)
            .then((pResp: BrandResponseDto) => {
               const _resp = data;
               const _arrayIndex = _resp.findIndex(
                  (item) => item.brand_id === pResp.brand_id
               );
               _resp.splice(_arrayIndex, 1, pResp);
               setData([..._resp]);
            })
            .catch((error: Error) => {
               console.log(error.message);
            });
      }

      cleanForm();
   };

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
   const openFormAdd = () => {
      cleanForm();
      setStatusForm(StatusForm.ADD);
   };

   const openFormUpdate = (pId: string) => {
      const _dataForm = data.find((item) => item.brand_id === pId);
      console.log(_dataForm);

      if (_dataForm) {
         setBrandId(_dataForm.brand_id);
         setShortName(_dataForm.short_name);
         setFullName(_dataForm.full_name);
         setIsActive(_dataForm.is_active);
         setStatusForm(StatusForm.UPDATE);
      }
   };

   const cleanForm = () => {
      setBrandId("");
      setShortName("");
      setFullName("");
      setIsActive(false);
   };
   useEffect(() => {
      getBrans();
      setCreationDate(new Date());
   }, []);

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

   return (
      <div className="flex flex-col">
         <div className="w-full max-w-[1440px] mx-auto">
            <h1>Brand</h1>
            <div className="w-full">
               <Drawer>
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
                        <DrawerTrigger asChild>
                           <Button onClick={openFormAdd}>Añadir</Button>
                        </DrawerTrigger>
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="ml-auto">
                                 Columns
                                 <ChevronDown className="ml-2 h-4 w-4" />
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
                                                  header.column.columnDef
                                                     .header,
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
                                    data-state={
                                       row.getIsSelected() && "selected"
                                    }
                                 >
                                    {row.getVisibleCells().map((cell) => (
                                       <TableCell key={cell.id}>
                                          {flexRender(
                                             cell.column.columnDef.cell,
                                             cell.getContext()
                                          )}
                                       </TableCell>
                                    ))}
                                    <TableCell>
                                       <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                             <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                             >
                                                <span className="sr-only">
                                                   Abrir menu
                                                </span>
                                                <MoreHorizontal className="h-4 w-4" />
                                             </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                             <DropdownMenuLabel>
                                                Acciones
                                             </DropdownMenuLabel>

                                             <DropdownMenuSeparator />
                                             <DrawerTrigger asChild>
                                                <DropdownMenuItem
                                                   onClick={() =>
                                                      openFormUpdate(
                                                         row.getValue(
                                                            "brand_id"
                                                         )
                                                      )
                                                   }
                                                >
                                                   Editar
                                                </DropdownMenuItem>
                                             </DrawerTrigger>
                                             <DropdownMenuItem>
                                                Eliminar
                                             </DropdownMenuItem>
                                             <DropdownMenuItem>
                                                Ver Historial
                                             </DropdownMenuItem>
                                          </DropdownMenuContent>
                                       </DropdownMenu>
                                    </TableCell>
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
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
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
                  <DrawerContent>
                     <div className="p-8">
                        <form
                           onSubmit={(event) => onSubmit(event)}
                           // className="space-y-2"
                        >
                           <DrawerHeader className="px-0">
                              <div className="flex justify-between gap-2">
                                 <DrawerTitle>Marca de productos</DrawerTitle>
                                 <Switch
                                    onCheckedChange={setIsActive}
                                    checked={isActive}
                                 />
                              </div>

                              <DrawerDescription>
                                 Ingrese la marca para los productos
                              </DrawerDescription>
                           </DrawerHeader>
                           <div className="flex h-5 justify-between items-center gap-4">
                              <Button
                                 disabled
                                 variant={"outline"}
                                 className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !creationDate && "text-muted-foreground"
                                 )}
                              >
                                 <CalendarPlusIcon className="mr-2 h-4 w-4" />
                                 {creationDate
                                    ? format(
                                         creationDate,
                                         "dd-MM-yyyy HH:mm:ss"
                                      )
                                    : ""}
                              </Button>
                              <Separator orientation="vertical" />
                              <Button
                                 disabled
                                 variant={"outline"}
                                 className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !creationDate && "text-muted-foreground"
                                 )}
                              >
                                 <CalendarClockIcon className="mr-2 h-4 w-4" />
                                 {creationDate
                                    ? format(
                                         creationDate,
                                         "dd-MM-yyyy HH:mm:ss"
                                      )
                                    : ""}
                              </Button>
                           </div>
                           <div className="py-4">
                              <div>
                                 <Label htmlFor="short_name">
                                    Nombre Corto
                                 </Label>
                                 <Input
                                    onChange={(e) =>
                                       setShortName(e.target.value)
                                    }
                                    value={shortName}
                                 />
                              </div>

                              <div>
                                 <Label>Nombre Completo</Label>
                                 <Input
                                    onChange={(e) =>
                                       setFullName(e.target.value)
                                    }
                                    value={fullName}
                                 />
                              </div>
                           </div>
                           <DrawerFooter className="px-0">
                              <Button type="submit">Guardar</Button>
                              <DrawerClose asChild>
                                 <Button variant="outline">Cancel</Button>
                              </DrawerClose>
                           </DrawerFooter>
                        </form>
                     </div>
                  </DrawerContent>
               </Drawer>
            </div>
         </div>
      </div>
   );
}
