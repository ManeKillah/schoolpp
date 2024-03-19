"use client";
import type {VariantProps} from "class-variance-authority";

import {cva} from "class-variance-authority";
import React from "react";
import clsx from "clsx";
import {
  BarChart3Icon,
  BlindsIcon,
  CreditCardIcon,
  FileKeyIcon,
  FileTextIcon,
  ForkliftIcon,
  GridIcon,
  HexagonIcon,
  HomeIcon,
  LayersIcon,
  PackageIcon,
  PentagonIcon,
  PlaneTakeoffIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import {DashboardIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {ScrollArea} from "@/shared/components/ui/scroll-area";
import {cn} from "@/shared/lib/utils";
import { Search } from "./search";

export function MenuList({children}: {children: React.ReactNode}) {
  return <ul className="flex list-none flex-col gap-1">{children}</ul>;
}

const MenuItemVariants = cva("flex flex-col items-start transition-colors", {
  variants: {
    type: {
      item: "cursor-pointer text-sm text-muted-foreground hover:text-muted-foreground/60",
      group: "[&>ul]:my-2 [&>ul]:ml-5 [&>ul]:border-l",
    },
  },
  defaultVariants: {
    type: "item",
  },
});

export interface MenuItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof MenuItemVariants> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  active?: boolean;
}

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  ({className, type = "item", active, icon, children, label, ...props}, ref) => {
    return (
      <li ref={ref} className={cn(MenuItemVariants({type, className}))} {...props}>
        <span
          className={clsx("flex w-full items-center gap-2", {
            "bg-accent/10 font-medium px-5 py-2": type === "group",
            "px-5 py-1": type === "item",
            "bg-primary/20 relative before:block before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[7px] before:h-[80%] before:rounded-r-full before:bg-primary ":
              active && type === "group",
            "text-secondary": active && type === "item",
          })}
        >
          {!!icon &&
            React.cloneElement(icon as React.ReactElement, {
              className: type === "item" ? "size-[1.1rem]" : "size-[1.4rem]",
            })}
          {label}
        </span>
        {children}
      </li>
    );
  },
);

MenuItem.displayName = "MenuItem";

const menuTop = [
  {
    label: "",
    // icon: <BarChart3Icon />,
    activePath: "dashboard",
    children: [
      {
        label: <Link href="/inicio/dashboard">Inicio</Link>,
        icon: <HomeIcon />,
        activePath: "startpage",
      },
      {
        label: <Link href="/inicio/rental">Alquileres</Link>,
        icon: <ZapIcon />,
        activePath: "rental",
      },
      {
        label: <Link href="/inicio/project">Proyectos</Link>,
        icon: <LayersIcon />,
        activePath: "reports",
      },
      {
        label: <Link href="/inicio/container">Contenedores</Link>,
        icon: <GridIcon />,
        activePath: "reports",
      },
      {
        label: <Link href="/inicio/equipment">Equipos</Link>,
        icon: <FileTextIcon />,
        activePath: "reports",
      },
      {
        label: <Link href="/inicio/store">Almacenes</Link>,
        icon: <PentagonIcon />,
        activePath: "reports",
      },
      {
        label: <Link href="/inicio/customers">Usuarios</Link>,
        icon: <UsersIcon />,
        activePath: "reports",
      },
    ],
  },
  // {
  //   label: "Operaciones",
  //   icon: <HomeIcon />,
  //   activePath: "operations",
  //   children: [
  //     {
  //       label: <Link href="/operations/customers">Clientes</Link>,
  //       icon: <UsersIcon />,
  //       activePath: "customers",
  //     },
  //     {
  //       label: <Link href="/operations/packages">Paquetes</Link>,
  //       icon: <PackageIcon />,
  //       activePath: "packages",
  //     },
  //     {
  //       label: <Link href="/operations/shipments">Solicitud de envíos</Link>,
  //       icon: <PlaneTakeoffIcon />,
  //       activePath: "shipments",
  //     },
  //     {
  //       label: <Link href="/operations/master-guides">Consolidado</Link>,
  //       icon: <FileKeyIcon />,
  //       activePath: "master-guides",
  //     },
  //   ],
  // },
];

const menuBottom = [
  {
    label: "Configuraciones",
    icon: <SettingsIcon />,
    activePath: "settings",
    children: [
     
      {
        label: <Link href="/settings/admins">Administradores</Link>,
        icon: <UserIcon />,
        activePath: "admins",
      },
    ],
  },
];

// Uso del array `menu` en tu componente...

export default function Aside() {
  const pathname = usePathname();

  const paths = React.useMemo(() => {
    return pathname.split("/").filter(Boolean);
  }, [pathname]);

  return (
    <aside className="mb-1 ml-2 flex flex-col overflow-hidden rounded bg-white shadow-md">
      <div className="flex-1">
        <div>
          <Search/>
        </div>
        <ScrollArea className="size-full">
          <MenuList>
            {menuTop.map((menuGroup) => (
              <MenuItem
                key={menuGroup.activePath}
                active={paths.includes(menuGroup.activePath)}
                // icon={menuGroup.icon}
                label={menuGroup.label}
                type="group"
              >
                <MenuList>
                  {menuGroup.children.map((menuItem) => (
                    <MenuItem
                      key={menuItem.activePath}
                      active={
                        paths.includes(menuGroup.activePath) && paths.includes(menuItem.activePath)
                      }
                      icon={menuItem.icon}
                      label={menuItem.label}
                    />
                  ))}
                </MenuList>
              </MenuItem>
            ))}
          </MenuList>
        </ScrollArea>
      </div>
      <div>
        <MenuList>
          {menuBottom.map((menuGroup) => (
            <MenuItem
              key={menuGroup.activePath}
              active={paths.includes(menuGroup.activePath)}
              icon={menuGroup.icon}
              label={menuGroup.label}
              type="group"
            >
              <MenuList>
                {menuGroup.children.map((menuItem) => (
                  <MenuItem
                    key={menuItem.activePath}
                    active={
                      paths.includes(menuGroup.activePath) && paths.includes(menuItem.activePath)
                    }
                    icon={menuItem.icon}
                    label={menuItem.label}
                  />
                ))}
              </MenuList>
            </MenuItem>
          ))}
        </MenuList>
      </div>
    </aside>
  );
}
