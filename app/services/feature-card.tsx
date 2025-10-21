import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="card hover:shadow-xl hover:scale-105 transition-all duration-300 space-y-4">
      <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center shadow-md">
        <Icon className="w-7 h-7 text-on-primary" />
      </div>
      <h3 className="text-xl font-bold text-text-primary">{title}</h3>
      <p className="text-base text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}