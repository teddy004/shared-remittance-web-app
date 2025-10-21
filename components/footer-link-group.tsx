import Link from "next/link";

interface LinkItem {
  href: string;
  label: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: LinkItem[];
}

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-muted-foreground hover:text-purple-600 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}