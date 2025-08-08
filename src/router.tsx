import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/Home'));
const GradePage = lazy(() => import('./pages/Grade'));
const TimetablePage = lazy(() => import('./pages/Timetable'));
const GraduationPage = lazy(() => import('./pages/Graduation'));
const ScholarshipPage = lazy(() => import('./pages/Scholarship'));

// Loading component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-darkgreen">Loading...</div>
  </div>
);

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="1140302"
            element={
              <Suspense fallback={<PageLoader />}>
                <GradePage />
              </Suspense>
            }
          />
          <Route
            path="1130420"
            element={
              <Suspense fallback={<PageLoader />}>
                <TimetablePage />
              </Suspense>
            }
          />
          <Route
            path="1170201"
            element={
              <Suspense fallback={<PageLoader />}>
                <GraduationPage />
              </Suspense>
            }
          />
          <Route
            path="1150502"
            element={
              <Suspense fallback={<PageLoader />}>
                <ScholarshipPage />
              </Suspense>
            }
          />
          <Route
            path="info"
            element={
              <div className="p-5 md:p-8">
                <h1 className="text-darkgreen text-mobile-medium-bold md:text-3xl md:font-bold">
                  공지사항 페이지
                </h1>
              </div>
            }
          />
          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-darkgreen mb-4">
                    404
                  </h1>
                  <p className="text-darkgray">개발 중인 페이지입니다.</p>
                </div>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;