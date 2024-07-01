"use client";

import { usePathname } from "next/navigation";
import {
  Coins,
  Layers,
  LayoutDashboard,
  Settings,
  StickyNote,
  UsersRound,
  Warehouse,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Header = () => {
  const { data: session, status } = useSession();

  const pathname = usePathname();

  console.log(pathname);

  return (
    <header className="border-r border-neutral-200 min-w-52 w-52 flex flex-col">
      <Link
        href="/dashboard"
        className="flex font-semibold items-center h-12 border-b border-neutral-200 px-4"
      >
        <Warehouse className="size-5 mb-1 mr-1" />
        <h1>Tires Manager</h1>
      </Link>
      <ul className="flex-1 px-2">
        <li className="my-2">
          <Link
            className={cn(
              pathname === "/dashboard"
                ? "bg-neutral-900 hover:!bg-neutral-900 text-white"
                : "",
              "block text-sm py-1.5 px-2 rounded-sm hover:bg-neutral-50 duration-300"
            )}
            href="/dashboard"
          >
            <LayoutDashboard className="size-4 inline mr-0.5 mb-1" />
            Dashboard
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={cn(
              pathname === "/users"
                ? "bg-neutral-900 hover:!bg-neutral-900 text-white"
                : "",
              "block text-sm py-1.5 px-2 rounded-sm hover:bg-neutral-50 duration-300"
            )}
            href="/users"
          >
            <UsersRound className="size-4 inline mr-0.5 mb-1" />
            Users
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={cn(
              pathname === "/estimates"
                ? "bg-neutral-900 hover:!bg-neutral-900 text-white"
                : "",
              "block text-sm py-1.5 px-2 rounded-sm hover:bg-neutral-50 duration-300"
            )}
            href="/estimates"
          >
            <StickyNote className="size-4 inline mr-0.5 mb-1" />
            Estimates
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={cn(
              pathname === "/entries"
                ? "bg-neutral-900 hover:!bg-neutral-900 text-white"
                : "",
              "block text-sm py-1.5 px-2 rounded-sm hover:bg-neutral-50 duration-300"
            )}
            href="/entries"
          >
            <Layers className="size-4 inline mr-0.5 mb-1" />
            Entries
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={cn(
              pathname === "/invoices"
                ? "bg-neutral-900 hover:!bg-neutral-900 text-white"
                : "",
              "block text-sm py-1.5 px-2 rounded-sm hover:bg-neutral-50 duration-300"
            )}
            href="/invoices"
          >
            <Coins className="size-4 inline mr-0.5 mb-1" />
            Invoices
          </Link>
        </li>
        <li className="my-2">
          <Link
            className={cn(
              pathname === "/settings"
                ? "bg-neutral-900 hover:!bg-neutral-900 text-white"
                : "",
              "block text-sm py-1.5 px-2 rounded-sm hover:bg-neutral-50 duration-300"
            )}
            href="/settings"
          >
            <Settings className="size-4 inline mr-0.5 mb-1" />
            Settings
          </Link>
        </li>
      </ul>
      <div className="h-12 grid place-items-center py-1.5 px-2 border-t border-neutral-200">
        <DropdownMenu>
          <DropdownMenuTrigger className="border border-neutral-200 hover:bg-neutral-50 duration-300 w-full h-full rounded-sm flex justify-center items-center font-semibold">
            <Avatar className="w-5 h-5 mr-2">
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {session?.user.username}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <button
                className="w-full text-left"
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              >
                Logout
              </button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-muted-foreground pointer-events-none">
              Signed in as {session?.user?.role === "admin" ? "Admin" : "User"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
