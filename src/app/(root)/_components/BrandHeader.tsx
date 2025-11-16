"use client"
import { useTheme } from "@/app/theme/provider";
import Link from "next/link";
import { ComponentType } from "react";

interface BrandHeaderProps {
  link?: string;
  name?: string;
  tagline?: string;
  Logo?: ComponentType<{ className?: string }>;
}

export default function BrandHeader({
  link = "/",
  name = "RunetSu",
  tagline = "Built by developers, for developers",
  Logo
}: BrandHeaderProps) {

  const { brand } = useTheme();

  return (
    <Link href={link} className="relative flex items-center gap-3 group">

      {/* Glow */}
      <div
        className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${brand.glowFrom}, ${brand.glowTo})`,
          filter: `blur(${brand.glowBlur})`
        }}
      />

      {/* Logo Box */}
      <div
        className="relative transition-all duration-300"
        style={{
          padding: brand.logoBox.padding,
          borderRadius: brand.logoBox.radius,
          background: brand.logoBox.background,
          border: brand.logoBox.border
        }}
      >
        {Logo && (
          <Logo
            className="size-6 transition-all duration-500 group-hover:rotate-0"
            style={{
              color: brand.logoColor,
              transform: `rotate(${brand.logoInitialRotation})`
            }}
          />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span
          style={{
            fontSize: brand.name.size,
            fontWeight: brand.name.weight,
            backgroundImage: `linear-gradient(to right,
              ${brand.name.gradientFrom},
              ${brand.name.gradientVia},
              ${brand.name.gradientTo}
            )`,
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}
        >
          {name}
        </span>

        <span
          style={{
            fontSize: brand.tagline.size,
            color: brand.tagline.color
          }}
        >
          {tagline}
        </span>
      </div>
    </Link>
  );
}
