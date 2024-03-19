/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client";
import type {ColumnDef} from "@tanstack/react-table";
import type {PackageExtended} from "@/@types/dto/package";
import type {DeliveryRequestsPackagesExtended} from "@/@types/dto/delivery-requests-packages";

import {EyeIcon, PencilIcon} from "lucide-react";
import {Pencil1Icon} from "@radix-ui/react-icons";
import Link from "next/link";

import {PackageStatus, UserStatus} from "@/@types/enums";
import {Button} from "@/shared/components/ui/button";
import {Badge} from "@/shared/components/ui/badge";
import {Sortable} from "@/shared/components/ui/table";
import {DeliveryRequestsPackages} from "@/@types/dto/delivery-requests-packages";
import { RentalExtended } from "@/@types/dto/rental";
import { Operations, OperationsExtended } from "@/@types/dto/operations";

export const columns: ColumnDef<OperationsExtended>[] = [
  {
    header: ({column}) => {
      return <Sortable column={column}>Id</Sortable>;
    },
    accessorKey: "id",
  },
  {
    header: "Usuario",
    cell: ({row}) => {
      // console.log(row.original);
      const name: string = row.original.user_name;
      const email: string = row.original.user_email;
  
      return (
        <div className="flex items-center mb-6">
      {/* Imagen de perfil */}
      <img src="/user_man.jpeg" alt="Imagen de perfil" className="rounded-full h-16 w-16 mr-4" />

      {/* Información del usuario */}
      <div>
        <div className="text-lg font-bold text-sm"> {name}</div>
        <div className="text-sm">{email}</div>
      </div>

    </div>
      );
    },
  },
  
  {
    header: "fecha",
    accessorKey: "operation_date",
    // accessorFn: (record) =>
    //   record.delivery_request_id?.first_name ? `${record.user.first_name} ${record.user.last_name}` : "",
  },
  {
    header: "operacion",
    accessorKey: "referece",
    // accessorFn: (record) =>
    //   record.delivery_request_id?.first_name ? `${record.user.first_name} ${record.user.last_name}` : "",
  },
  {
    header: "Fecha",
    // accessorKey: "equipment_id",
    accessorFn: (record) =>
      record.operation_date ? `${new Date(record.operation_date).toLocaleDateString()}` : "",
  },
  {
    header: "Estado",
    accessorKey: "status",
    cell: ({row}) => {
      const value = row.getValue("status");

      return (
        <Badge className="w-20" variant={value === 'completed' ? "success" : value === 'pending' ? "secondary": "destructive"}>
          {value}
        </Badge>
      );
    },
  },
  // {
  //   header: "Instrucciones",
  //   accessorKey: "special_instructions",
  // },
  // {
  //   header: "Acciones",
  //   cell: ({row}) => {
  //     return (
  //       <div className="flex items-center gap-1">
  //         <Link className="text-warning" href={`/inicio/rental/${row.getValue("id")}`}>
  //           <PencilIcon className="size-4" />
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];
