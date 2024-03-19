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
import { Project } from "@/@types/dto/project";
import DeleteConfirmationDialog from "../project-delete";
import { useState } from "react";
import createApi from "../../api";
import { getAccessToken } from "@/shared/lib/auth";

const handleDelete = async (id: number) => {
  // if (isDeleteConfirmed) {
    const accessToken = await getAccessToken();
    const api = createApi(accessToken ?? "");
  
    try {
      await api.project.delete(id);
      console.log(`project with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  
};

export const columns: ColumnDef<Project>[] = [
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
    accessorKey: "reference",
    // accessorFn: (record) =>
    //   record.delivery_request_id?.first_name ? `${record.user.first_name} ${record.user.last_name}` : "",
  },
  {
    header: "Ejecutivo",
    accessorKey: "ejecutive",
    // accessorFn: (record) =>
    //   record.delivery_request_id?.first_name ? `${record.user.first_name} ${record.user.last_name}` : "",
  },
  // {
  //   header: "Proyecto",
  //   accessorKey: "project_id",
  // },
  {
    header: "Empresa",
    accessorKey: "company",
  },
  {
    header: "Fecha inicio",
    // accessorKey: "equipment_id",
    accessorFn: (record) =>
      record.start_date ? `${new Date(record.start_date).toLocaleDateString()}` : "",
  },{
    header: "Fecha fin",
    // accessorKey: "equipment_id",
    accessorFn: (record) =>
      record.end_date ? `${new Date(record.end_date).toLocaleDateString()}` : "",
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
        <Link className="text-warning" href={`/inicio/project/${row.getValue('id')}`} style={{ marginRight: '12px' }}>
          <EyeIcon className="size-4" />
        </Link>
        <Link className="text-warning" href={`/inicio/project/${row.getValue('id')}/details`}>
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
