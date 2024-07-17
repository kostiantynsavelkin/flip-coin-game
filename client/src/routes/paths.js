// ----------------------------------------------------------------------

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_AUTH = '/auth';

function path(root, sublink) {
  return `${root}${sublink}`;
}
// ----------------------------------------------------------------------

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  page404: '/404',
  page500: '/500'
};

export const PATH_HOME = {
  root: '/',
  guide: '/guide',
  faq: '/faq',
  term: '/term',
  privacy: '/privacy',
  dashboard: ROOTS_DASHBOARD
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  setting: '/setting/:id'
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  forgotPassword: path(ROOTS_AUTH, '/forgot-password/:email')
};
