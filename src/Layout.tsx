import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen flex justify-center">
        <div className="w-[390px] relative">
          <Outlet context={{ isMobile: true }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Outlet context={{ isMobile: false }} />
    </div>
  );
};

export default Layout;
