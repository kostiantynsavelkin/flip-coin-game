import NProgress from 'nprogress';
import { Switch, Route } from 'react-router-dom';
import { Suspense, Fragment, lazy, useEffect, useMemo } from 'react';
// material
import { makeStyles } from '@material-ui/core/styles';
// guards
// import GuestGuard from '../guards/GuestGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
//
import { PATH_PAGE } from './paths';

// ----------------------------------------------------------------------

const nprogressStyle = makeStyles((theme) => ({
  '@global': {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        top: 0,
        left: 0,
        height: 2,
        width: '100%',
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 0 2px ${theme.palette.primary.main}`
      },
      '& .peg': {
        right: 0,
        opacity: 1,
        width: 100,
        height: '100%',
        display: 'block',
        position: 'absolute',
        transform: 'rotate(3deg) translate(0px, -4px)',
        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
      }
    }
  }
}));

function RouteProgress(props) {
  nprogressStyle();

  NProgress.configure({
    speed: 500,
    showSpinner: false
  });

  useMemo(() => {
    NProgress.start();
  }, []);

  useEffect(() => {
    NProgress.done();
  }, []);

  return <Route {...props} />;
}

export function renderRoutes(routes = []) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, idx) => {
          const Component = route.component;
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;

          return (
            <RouteProgress
              key={`routes-${idx}`}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}

const routes = [
  // Others Routes
  {
    exact: true,
    path: PATH_PAGE.page404,
    component: lazy(() => import('../views/Page404'))
  },
  {
    exact: true,
    path: PATH_PAGE.page500,
    component: lazy(() => import('../views/Page500'))
  },
  {
    exact: true,
    path: PATH_PAGE.comingSoon,
    component: lazy(() => import('../views/ComingSoon'))
  },
  {
    exact: true,
    path: '/',
    component: lazy(() => import('../views/LandingPage'))
  },
  {
    exact: true,
    path: '/mint',
    component: lazy(() => import('../views/MintPage'))
  },
  {
    exact: true,
    path: '/mystats',
    component: lazy(() => import('../views/MyStatsPage'))
  },
  {
    exact: true,
    path: '/leaderboard',
    component: lazy(() => import('../views/LeaderBoardPage'))
  },
  {
    exact: true,
    path: '/streaks',
    component: lazy(() => import('../views/StreaksPage'))
  }
];

export default routes;
