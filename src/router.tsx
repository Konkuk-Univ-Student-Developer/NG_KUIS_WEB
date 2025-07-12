import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import DesktopHomePage from './components/pages/DesktopHomePage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResponsiveHomePage />} />
        <Route path="/courses" element={<div>강의 페이지</div>} />
        <Route path="/grades" element={<div>성적 페이지</div>} />
        <Route path="/info" element={<div>학사정보 페이지</div>} />
      </Routes>
    </BrowserRouter>
  );
};

const ResponsiveHomePage: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile ? <HomePage /> : <DesktopHomePage />;
};

export default Router;
