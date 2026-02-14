"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { tokenAtom, tokenTimestampAtom } from "@/atom/Auth";

import { NavLogo } from "./NavLogo";
import { NavItem } from "./NavItem";
import { LogoutButton } from "./LogoutButton";
import { MobileMenuToggle } from "./MobileMenuToggle";
import { DecorativeBackground } from "./DecorativeBackground";

const NAV_ITEMS = [
  { name: "Projects", path: "/dashboard/projects" },
  { name: "Blogs", path: "/dashboard/blogs" },
  { name: "Clients", path: "/dashboard/clients" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [, setToken] = useAtom(tokenAtom);
  const [, setTokenTimestamp] = useAtom(tokenTimestampAtom);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setToken("");
    setTokenTimestamp(0);
    router.push("/");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white shadow-xl relative overflow-hidden">
      <DecorativeBackground />

      <div className="container mx-auto px-4 sm:px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <NavLogo />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.path}
                name={item.name}
                path={item.path}
                isActive={pathname === item.path}
              />
            ))}
            <LogoutButton onLogout={handleLogout} />
          </div>

          <MobileMenuToggle
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2 animate-fadeIn">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.path}
                name={item.name}
                path={item.path}
                isActive={pathname === item.path}
                isMobile
                onClick={closeMobileMenu}
              />
            ))}
            <LogoutButton
              onLogout={() => {
                handleLogout();
                closeMobileMenu();
              }}
              isMobile
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
