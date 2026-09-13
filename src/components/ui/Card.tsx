import type { ReactNode } from "react";

export type CardVariant = "featured" | "domain" | "default";

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}

export default function Card({
  children,
  variant = "default",
  className = "",
}: CardProps) {
  // Gestalt: Proximity & Similarity — shared padding, border-radius, and shadow tokens (.card-base)
  const variantStyles: Record<CardVariant, string> = {
    featured:
      "card-base border-spidey-red/40 bg-[#120D12]/85 hover:border-spidey-red shadow-[0_8px_32px_rgba(230,36,41,0.18)] hover:shadow-card-hover",
    domain:
      "card-base hover:border-spidey-red/60 hover:-translate-y-1",
    default:
      "card-base hover:border-spidey-red/50 hover:-translate-y-0.5",
  };

  return (
    <div className={`flex flex-col justify-between overflow-hidden ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
