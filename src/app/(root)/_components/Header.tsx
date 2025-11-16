"use client"
import Link from "next/link";
import { Code2, CodeXml } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import UserProfileBtn from "./UserProfileButton";
import PremiumStatus from "./Premium";
import BrandHeader from "./BrandHeader";
import ShareButton from "./ShareButton";
import { useTheme } from "@/app/theme/provider";

function Header({hasAccess}: {hasAccess: boolean}) {
  const {header, nav} = useTheme();

  return (
    <div className="relative z-10">
      <div
        className="flex items-center lg:justify-between justify-center 
        mb-4"
        style={{
          background: header.background,
          padding: header.padding,
          borderRadius: header.radius,
          border: header.border,
          backdropFilter: `blur(${header.blur})`
        }}
      >
        <div className="hidden lg:flex items-center gap-8">
          <BrandHeader
        link="/"
        name="RunetSu"
        tagline="Built by developers, for developers"
        Logo={CodeXml}
        />

          {/* Navigation */}
          {/* <nav className="flex items-center space-x-1">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 transition-all duration-300 shadow-lg overflow-hidden"
              style={{
                padding: `${nav.item.paddingY} ${nav.item.paddingX}`,
                borderRadius: nav.item.radius,
                background: nav.item.background,
                border: nav.item.border,
                color: nav.item.text
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, ${nav.hoverGradient.from}, ${nav.hoverGradient.to})`
                }}
              />
              <Code2
                className="w-4 h-4 relative z-10 transition-transform"
                style={{
                  color: nav.item.iconColor
                }}
              />
              <span
                className="text-sm font-medium relative z-10 transition-colors"
                style={{
                  color: nav.item.text
                }}
              >
                Snippets
              </span>
            </Link>
          </nav> */}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(hasAccess)} />
          </div>

          {/* {!convexUser?.isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 
            hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
            to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
            transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                Pro
              </span>
            </Link>
          )} */}
          <PremiumStatus isPro={Boolean(hasAccess)}/>

          <SignedIn>
            <ShareButton hasAccess={Boolean(!hasAccess)}/>
          </SignedIn>

          <div className="pl-3"
            style={{ borderLeft: "1px solid rgba(80,80,80,0.7)" }}>
            <UserProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;