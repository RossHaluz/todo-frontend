import LogoutBtn from "@/components/ui/logout-btn";
import MobileMenu from "@/components/ui/mobile-menu";
import React from "react";

const Navbar = () => {
  return (
    <header className="w-full border-b px-4 py-2 bg-white">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
        <LogoutBtn />
      </div>
    </header>
  );
};

export default Navbar;
