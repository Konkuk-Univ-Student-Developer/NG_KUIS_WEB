import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/Home"));
const GradePage = lazy(() => import("./pages/Grade"));
const TimetablePage = lazy(() => import("./pages/Timetable"));
const GraduationPage = lazy(() => import("./pages/Graduation"));
const ScholarshipPage = lazy(() => import("./pages/Scholarship"));

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
            path="grades"
            element={
              <Suspense fallback={<PageLoader />}>
                <GradePage />
              </Suspense>
            }
          />
          <Route
            path="timetable"
            element={
              <Suspense fallback={<PageLoader />}>
                <TimetablePage />
              </Suspense>
            }
          />
          <Route
            path="graduation"
            element={
              <Suspense fallback={<PageLoader />}>
                <GraduationPage />
              </Suspense>
            }
          />
          <Route
            path="scholarship"
            element={
              <Suspense fallback={<PageLoader />}>
                <ScholarshipPage />
              </Suspense>
            }
          />
          <Route
            path="courses"
            element={
              <div className="p-5 md:p-8">
                <h1 className="text-darkgreen text-mobile-medium-bold md:text-3xl md:font-bold">
                  강의 페이지 (개발 중)
                </h1>
              </div>
            }
          />
          <Route
            path="info"
            element={
              <div className="p-5 md:p-8">
                <h1 className="text-darkgreen text-mobile-medium-bold md:text-3xl md:font-bold">
                  학사정보 페이지 (개발 중)
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
                  <p className="text-darkgray">페이지를 찾을 수 없습니다.</p>
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
