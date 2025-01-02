import DBDLandingPage from '@components/dbd/DBDLandingPage';
import LandingPage from '@components/LandingPage';

const baseRoutes = [
    { path: '/dbd/', element: <DBDLandingPage /> },
    { path: '/', element: <LandingPage /> },
];

export default baseRoutes;
