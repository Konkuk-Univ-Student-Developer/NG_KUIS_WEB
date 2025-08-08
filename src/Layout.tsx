import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '@/commons';
import WebSidebar from '@/commons/sidebar/WebSidebar';
import MobileSidebar from '@/commons/sidebar/MobileSidebar';
import useSidebarStore from '@/stores/sidebarStore';
import Footer from '@/commons/Footer';

const Layout: React.FC = () => {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <div className="min-h-screen">
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