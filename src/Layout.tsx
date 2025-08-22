import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "@/components/commons";
import WebSidebar from "@/components/commons/sidebar/WebSidebar";
import MobileSidebar from "@/components/commons/sidebar/MobileSidebar";
import useSidebarStore from "@/stores/sidebarStore";
import Footer from "@/components/commons/Footer";

const Layout: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useSidebarStore();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest("[data-sidebar-toggle]")
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, closeSidebar]);

  const location = useLocation();
  const showFooter = location.pathname !== "/chat";

  return (
    <div className="min-h-screen pt-14 md:pt-16">
      <TopBar />
      {isSidebarOpen && (
        <>
          <div
            className="hidden md:block fixed inset-0 top-16 bg-black/50 backdrop-blur-xs z-30"
            aria-hidden="true"
          />
          <div ref={sidebarRef}>
            <WebSidebar />
            <MobileSidebar />
          </div>
        </>
      )}
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
