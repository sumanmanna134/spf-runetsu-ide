"use client";
import Link from "next/link";
import { CircleStar, Sparkles } from "lucide-react";
import useMounted from "@/hooks/useMounted";

interface PremiumStatusProps {
  isPro?: boolean;
}

export default function PremiumStatus({ isPro }: PremiumStatusProps) {
  const mounted = useMounted();
  if (!mounted) return null;  

  return isPro ? (
    <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 font-medium text-sm">
      <CircleStar className="w-4 h-4 text-green-400" />
      Premium
    </span>
  ) : (
    <Link
      href="/pricing"
      className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
    >
      <Sparkles className="w-4 h-4 text-amber-400" />
      <span className="text-sm font-medium text-amber-400/90">
        Pro
      </span>
    </Link>
  );
}
