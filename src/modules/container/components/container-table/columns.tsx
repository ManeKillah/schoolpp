/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client";
import type {ColumnDef} from "@tanstack/react-table";
import type {PackageExtended} from "@/@types/dto/package";
import type {DeliveryRequestsPackagesExtended} from "@/@types/dto/delivery-requests-packages";

import {EyeIcon, PencilIcon, TrashIcon} from "lucide-react";
import {Pencil1Icon} from "@radix-ui/react-icons";
import Link from "next/link";

import {PackageStatus, UserStatus} from "@/@types/enums";
import {Button} from "@/shared/components/ui/button";
import {Badge} from "@/shared/components/ui/badge";
import {Sortable} from "@/shared/components/ui/table";
import {DeliveryRequestsPackages} from "@/@types/dto/delivery-requests-packages";
import { RentalExtended } from "@/@types/dto/rental";
import { Container } from "postcss";
import { useState } from "react";
import DeleteConfirmationDialog from "../rental-delete";
import { getAccessToken } from "@/shared/lib/auth";
import createApi from "../../api";

const handleDelete = async (id: number) => {
  // if (isDeleteConfirmed) {
    const accessToken = await getAccessToken();
    const api = createApi(accessToken ?? "");
  
    try {
      await api.container.delete(id);
      console.log(`container with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting container:", error);
    }
  
};

export const columns: ColumnDef<Container>[] = [
  {
    header: ({column}) => {
      return <Sortable column={column}>Id</Sortable>;
    },
    accessorKey: "id",
  },
  // {
  //   header: "Cliente",
  //   accessorFn: (record) =>
  //     record.user?.first_name ? `${record.user.first_name} ${record.user.last_name}` : "",
  // },
  {
    header: "Referencia",
    accessorKey: "reference_pre",
    // accessorFn: (record) =>
    //   record.delivery_request_id?.first_name ? `${record.user.first_name} ${record.user.last_name}` : "",
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
    header: "Ubicacion",
    accessorKey: "location",
  },
  {
    header: "Proyecto",
    accessorKey: "project_id",
  },
  {
    header: "Foto",
    cell: ({row}) => {
      const imageUrl = row.getValue("image_url");
  
      return (
        <div className="rounded-full overflow-hidden w-10 h-10">
          <img src='/fondo.jpg' alt="Foto" className="w-full h-full object-cover" />
        </div>
      );
    },
  },
  
  // {
  //   header: "Instrucciones",
  //   accessorKey: "special_instructions",
  // },
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
        <Link className="text-warning" href={`/inicio/container/${row.getValue('id')}`} style={{ marginRight: '12px' }}>
          <EyeIcon className="size-4" />
        </Link>
        <Link className="text-warning" href={`/inicio/container/${row.getValue('id')}/details`}>
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
