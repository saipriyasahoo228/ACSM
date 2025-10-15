import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/contractor&worker',
        element: lazy(() => import('./views/contractorandemployee/contractor'))
      },
       {
        exact: 'true',
        path: '/traingplanner',
        element: lazy(() => import('./views/trainingandinduction/trainingplanner'))
      },
      {
        exact: 'true',
        path: '/training',
        element: lazy(() => import('./views/trainingandinduction/training'))
      },
      {
        exact: 'true',
        path: '/worker',
        element: lazy(() => import('./views/trainingandinduction/worker'))
      },
      {
        exact: 'true',
        path: '/certificate',
        element: lazy(() => import('./views/trainingandinduction/certificate'))
      },
     
      {
        exact: 'true',
        path: '/trainingdashboard',
        element: lazy(() => import('./views/trainingandinduction/trainingdashboard'))
      },
      {
        exact: 'true',
        path: '/permittype',
        element: lazy(() => import('./views/permittowork/permittype'))
      },
      {
        exact: 'true',
        path: '/permitworkflow',
        element: lazy(() => import('./views/permittowork/permitworkflow'))
      },
      {
        exact: 'true',
        path: '/workercompetency',
        element: lazy(() => import('./views/permittowork/workercompetency'))
      },
      {
        exact: 'true',
        path: '/permitrequest&statustracker',
        element: lazy(() => import('./views/permittowork/permitrequestandstatustracker'))
      },
      {
        exact: 'true',
        path: '/permithistory&reporting',
        element: lazy(() => import('./views/permittowork/permithistory&reporting'))
      },
      {
        exact: 'true',
        path: '/permitdashboard',
        element: lazy(() => import('./views/permittowork/permitdashboard'))
      },
      {
        exact: 'true',
        path: '/ppecatalog',
        element: lazy(() => import('./views/issuance&renewal/ppecatalog'))
      },
       {
        exact: 'true',
        path: '/toolissuance',
        element: lazy(() => import('./views/issuance&renewal/toolissuance'))
      },
      {
        exact: 'true',
        path: '/storekeeper',
        element: lazy(() => import('./views/issuance&renewal/storekeeper'))
      },
      {
        exact: 'true',
        path: '/employee acknowledgment & renewal',
        element: lazy(() => import('./views/issuance&renewal/empacknowledgement'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
