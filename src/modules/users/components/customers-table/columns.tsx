/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client";
import type {ColumnDef} from "@tanstack/react-table";
import type {User} from "@/@types/dto/user";

import {EyeIcon, HomeIcon, PencilIcon, TrashIcon} from "lucide-react";
import Link from "next/link";

import {UserStatus} from "@/@types/enums";
import {Button} from "@/shared/components/ui/button";
import {Badge} from "@/shared/components/ui/badge";
import {Sortable} from "@/shared/components/ui/table";
import createApi from "../../api";
import { getAccessToken } from "@/shared/lib/auth";
import { useState } from "react";
import DeleteConfirmationDialog from "../rental-delete";

const handleDelete = async (id: number) => {
  // if (isDeleteConfirmed) {
    const accessToken = await getAccessToken();
    const api = createApi(accessToken ?? "");
  
    try {
      await api.customer.delete(id);
      console.log(`user with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  
};

export const columns: ColumnDef<User>[] = [
  {
    header: ({column}) => {
      return <Sortable column={column}>Id</Sortable>;
    },
    accessorKey: "id",
  },
  {
    header: "referencia",
    accessorKey: "reference",
  },
  {
    header: "Nombre",
    accessorFn: (record) => (record.first_name ? `${record.first_name}` : ""),
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Rol",
    accessorKey: "role",
  },
  {
    header: "Fecha de alta",
    accessorFn: (record) => (record.createdAt ? `${new Date(record.createdAt).toLocaleDateString()}` : ""),
  },
  {
    header: "Estado",
    accessorKey: "status",
    cell: ({row}) => {
      const value = row.getValue("status") as UserStatus;

      // console.log({value});

      return (
        <Badge className="w-20" variant={value === UserStatus.Active ? "success" : "destructive"}>
          {value}
        </Badge>
      );
    },
  },
  {
    header: "Acciones",
    cell: ({row}) => {
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Define el estado y la función para el diálogo
      const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null); // Define el estado y la función para el ID a eliminar

      const handleDeleteConfirmation = (id: number) => {
        setItemIdToDelete(id);
        setIsDeleteDialogOpen(true);
      };
      return (
        <>
      {/* Tu tabla u otros elementos aquí */}
      <div className="flex items-center gap-2">
        <Link className="text-warning" href={`/inicio/customers/${row.getValue('id')}`} style={{ marginRight: '12px' }}>
          <EyeIcon className="size-4" />
        </Link>
        <Link className="text-warning" href={`/inicio/customers/${row.getValue('id')}/details`}>
          <PencilIcon className="size-4" />
        </Link>
        <Button
          className="text-warning"
          variant="link"
          onClick={() => handleDeleteConfirmation(Number(row.getValue('id')))}
          style={{ marginRight: '-15px' }}
        >
          <TrashIcon className="size-4" />
        </Button>
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={() => handleDelete(row.getValue('id'))}
        itemName="Elemento"
      />
    </>
      );
    },
  },
];
