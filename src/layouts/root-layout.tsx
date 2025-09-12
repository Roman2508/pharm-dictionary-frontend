import type { FC } from "react";
import { Outlet } from "react-router";
import { Languages } from "lucide-react";

import Logo from "@/components/icons/logo";
import NavLinks from "@/components/common/nav-links";

const RootLayout: FC = () => {
  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between lg:gap-12 lg:justify-start h-16">
            <div className="flex items-center gap-2">
              <Languages className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-foreground sm:block hidden">
                Pharm Dictionary
              </span>
            </div>

            <NavLinks />
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden bg-primary header-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="relative container mx-auto px-4 py-10">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Logo variant="default" className="animate-pulse w-40 h-40" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-balance">
              Житомирський фармацевтичний коледж
            </h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto text-pretty">
              Латинсько-український словник фармацевтично-медичних термінів
            </p>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default RootLayout;
