/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client";
import type {ColumnDef} from "@tanstack/react-table";
import type {Address} from "@/@types/dto/address";

import {PencilIcon, TrashIcon} from "lucide-react";

import {Button} from "@/shared/components/ui/button";
import {Badge} from "@/shared/components/ui/badge";
import {Sortable} from "@/shared/components/ui/table";

export const columns: ColumnDef<Address>[] = [
  {
    header: ({column}) => {
      return <Sortable column={column}>Id</Sortable>;
    },
    accessorKey: "id",
  },
  {
    header: "Dirección",
    accessorKey: "address_line1",
  },
  {
    header: "Pais",
    accessorKey: "country_iso_code",
    // cell: () => (
      //   <Badge className="w-20" variant="success">
      //     Enviar
      //   </Badge>
      // ),
    },
    {
      header: "Ciudad",
      accessorKey: "city",
      // cell: () => {
        //   return crypto.randomUUID();
        // },
      },
      {
        header: "Notas",
        accessorKey: "notes",
    // cell: () => "$ 12",
  },
  {
    header: "Acciones",
    cell: () => {
      return (
        <div className="flex items-center gap-1">
          <Button className="text-warning" size="icon" variant="warning-ghost">
            <PencilIcon className="size-4" />
          </Button>
          <Button className="text-destructive" size="icon" variant="destructive-ghost">
            <TrashIcon className="size-4" />
          </Button>
        </div>
      );
    },
  },
];
