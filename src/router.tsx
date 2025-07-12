import React from 'react';
import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './components/pages/HomePage';
import DesktopHomePage from './components/pages/DesktopHomePage';

type OutletContextType = {
  isMobile: boolean;
};

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ResponsiveHomePage />} />
          <Route path="courses" element={<ResponsiveCoursePage />} />
          <Route path="grades" element={<ResponsiveGradePage />} />
          <Route path="info" element={<ResponsiveInfoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const ResponsiveHomePage: React.FC = () => {
  const { isMobile } = useOutletContext<OutletContextType>();
  return isMobile ? <HomePage /> : <DesktopHomePage />;
};

const ResponsiveCoursePage: React.FC = () => {
  const { isMobile } = useOutletContext<OutletContextType>();
  return isMobile ? <div>모바일 강의 페이지</div> : <div>데스크톱 강의 페이지</div>;
};

const ResponsiveGradePage: React.FC = () => {
  const { isMobile } = useOutletContext<OutletContextType>();
  return isMobile ? <div>모바일 성적 페이지</div> : <div>데스크톱 성적 페이지</div>;
};

const ResponsiveInfoPage: React.FC = () => {
  const { isMobile } = useOutletContext<OutletContextType>();
  return isMobile ? <div>모바일 학사정보 페이지</div> : <div>데스크톱 학사정보 페이지</div>;
};

export default Router;
