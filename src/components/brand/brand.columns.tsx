
import { Button } from "../ui/button";
import { BrandResponseDto } from "@/app/api/brand/dto/responses/brand.response.dto";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown as ArrowUpDownIcon } from "lucide-react";

export const brandColumns: ColumnDef<BrandResponseDto>[] = [
   {
      accessorKey: ("brand_id"),
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
            >
               N°
            </Button>
         );
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
               <ArrowUpDownIcon className="ml-2 h-4 w-4" />
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
               <ArrowUpDownIcon className="ml-2 h-4 w-4" />
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
               <ArrowUpDownIcon className="ml-2 h-4 w-4" />
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
               <ArrowUpDownIcon className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => (
         <div className="lowercase">{row.getValue("creation_date")}</div>
      ),
   },
];
