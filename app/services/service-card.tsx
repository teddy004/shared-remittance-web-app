import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  link,
}: ServiceCardProps) {
  return (
    <div className="rounded-lg overflow-hidden bg-white border border-purple-200 card shadow-lg hover:shadow-xl transition-all flex flex-col">
      <div className="h-48 bg-primary flex items-center justify-center">
        <Icon className="h-20 w-20 text-white" />
      </div>
      <div className="p-6 space-y-3 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground text-justify leading-relaxed flex-grow">
          {description}
        </p>
        <Link href={link} className="mt-4">
          <Button className="btn-primary w-full">Explore</Button>
        </Link>
      </div>
    </div>
  );
}