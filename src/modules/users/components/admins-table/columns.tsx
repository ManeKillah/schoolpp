/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client";
import type {ColumnDef} from "@tanstack/react-table";
import type {User} from "@/@types/dto/user";

import {EyeIcon, Trash} from "lucide-react";
import Link from "next/link";
import {Pencil1Icon} from "@radix-ui/react-icons";

import {UserStatus} from "@/@types/enums";
import {Button} from "@/shared/components/ui/button";
import {Badge} from "@/shared/components/ui/badge";
import {Sortable} from "@/shared/components/ui/table";

export const columns: ColumnDef<User>[] = [
  {
    header: ({column}) => {
      return <Sortable column={column}>Id</Sortable>;
    },
    accessorKey: "id",
  },
  {
    header: "Nombre",
    accessorFn: (record) => (record.first_name ? `${record.first_name} ${record.last_name}` : ""),
  },
  {
    header: "Celular",
    accessorKey: "phone",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Estado",
    accessorKey: "status",
    cell: ({row}) => {
      const value = row.getValue("status") as UserStatus;

      return (
        <Badge className="w-20" variant={value === UserStatus.Active ? "success" : "destructive"}>
          {value}
        </Badge>
      );
    },
  },
  {
    header: "Actions",
    cell: ({row}) => {
      return (
        <div className="flex items-center gap-2">
          <Link href={`/users/${row.getValue("id")}`}>
            <Button size="icon" variant="link">
              <EyeIcon className="size-4" />
            </Button>
          </Link>
          <Link href={`/settings/admins/${row.getValue("id")}`}>
            <Button size="icon" variant="destructive-ghost">
              <Pencil1Icon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
