"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardNavLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isMobile?: boolean;
}

export function DashboardNavLink({ href, label, icon: Icon, isMobile = false }: DashboardNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  if (isMobile) {
    return (
      <Link href={href} className="flex-1">
        <Button variant="ghost" size="sm" className={cn("flex-col gap-1 h-auto py-2 w-full", isActive && "text-primary")}>
          <Icon className="h-5 w-5" />
          <span className="text-xs">{label}</span>
        </Button>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <Button variant={isActive ? "secondary" : "ghost"} size="sm" className={cn("gap-2", isActive && "bg-primary/10 text-primary")}>
        <Icon className="h-4 w-4" />
        {label}
      </Button>
    </Link>
  );
}