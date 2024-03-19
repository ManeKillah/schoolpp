"use client";
import {LogOut, User, UserCircle} from "lucide-react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {Button} from "@/shared/components/ui/button";

export function AccountOptions() {
  const {data: session} = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <User className="size-[2.5rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center gap-2 px-2 py-3">
          <UserCircle className="size-[2rem]" />
          <p className="capitalize">
            {session?.user.first_name} {session?.user.last_name}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-1">
          <User className="size-[1rem]" />
          <Link href="/account/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-1" onClick={() => signOut()}>
          <LogOut className="size-[1rem]" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
