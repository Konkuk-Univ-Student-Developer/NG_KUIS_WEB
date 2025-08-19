import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '@/components/commons';
import WebSidebar from '@/components/commons/sidebar/WebSidebar';
import MobileSidebar from '@/components/commons/sidebar/MobileSidebar';
import useSidebarStore from '@/stores/sidebarStore';
import Footer from '@/components/commons/Footer';

const Layout: React.FC = () => {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <div className="min-h-screen pt-14 md:pt-16">
      <TopBar />
      {isSidebarOpen && (
        <>
          <WebSidebar />
          <MobileSidebar />
        </>
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;