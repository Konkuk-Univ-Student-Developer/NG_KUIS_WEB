import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom';
import Layout from './Layout';

// Lazy load pages for better performance
const HomeMobile = lazy(() => import('./pages/home/mobile'));
const HomeDesktop = lazy(() => import('./pages/home/desktop'));
const GradeMobile = lazy(() => import('./pages/grade/mobile'));
const GradeDesktop = lazy(() => import('./pages/grade/desktop'));
const TimetableMobile = lazy(() => import('./pages/timetable/mobile'));
const TimetableDesktop = lazy(() => import('./pages/timetable/desktop'));
const GraduationMobile = lazy(() => import('./pages/graduation/mobile'));
const GraduationDesktop = lazy(() => import('./pages/graduation/desktop'));
const ScholarshipMobile = lazy(() => import('./pages/scholarship/mobile'));
const ScholarshipDesktop = lazy(() => import('./pages/scholarship/desktop'));

type OutletContextType = {
  isMobile: boolean;
};

// Loading component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-darkgreen">Loading...</div>
  </div>
);

// Route configuration
const routes = [
  {
    path: '/',
    mobile: HomeMobile,
    desktop: HomeDesktop,
    name: 'Home'
  },
  {
    path: '/grades',
    mobile: GradeMobile,
    desktop: GradeDesktop,
    name: 'Grades'
  },
  {
    path: '/timetable',
    mobile: TimetableMobile,
    desktop: TimetableDesktop,
    name: 'Timetable'
  },
  {
    path: '/graduation',
    mobile: GraduationMobile,
    desktop: GraduationDesktop,
    name: 'Graduation'
  },
  {
    path: '/scholarship',
    mobile: ScholarshipMobile,
    desktop: ScholarshipDesktop,
    name: 'Scholarship'
  },
  {
    path: '/courses',
    mobile: () => <div className="p-5">모바일 강의 페이지 (개발 중)</div>,
    desktop: () => <div className="p-8">데스크톱 강의 페이지 (개발 중)</div>,
    name: 'Courses'
  },
  {
    path: '/info',
    mobile: () => <div className="p-5">모바일 학사정보 페이지 (개발 중)</div>,
    desktop: () => <div className="p-8">데스크톱 학사정보 페이지 (개발 중)</div>,
    name: 'Info'
  }
];

// Responsive component wrapper
const ResponsivePage: React.FC<{ mobile: React.ComponentType; desktop: React.ComponentType }> = ({
  mobile: MobileComponent,
  desktop: DesktopComponent
}) => {
  const { isMobile } = useOutletContext<OutletContextType>();
  const Component = isMobile ? MobileComponent : DesktopComponent;

  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map(({ path, mobile, desktop, name }) => (
            <Route
              key={path}
              path={path === '/' ? undefined : path.slice(1)}
              index={path === '/'}
              element={<ResponsivePage mobile={mobile} desktop={desktop} />}
            />
          ))}
          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-darkgreen mb-4">404</h1>
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