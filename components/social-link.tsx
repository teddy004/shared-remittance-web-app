import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
}

export function SocialLink({ href, icon: Icon }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-text-secondary hover:text-on-primary hover:bg-primary hover:border-transparent transition-all duration-300 hover:scale-110 shadow-sm"
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
}