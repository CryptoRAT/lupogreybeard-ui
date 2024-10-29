import DBDLandingPage from '@components/dbd/DBDLandingPage';
import LandingPage from '@components/LandingPage';

const routes = [
    { path: '/dbd/', element: <DBDLandingPage /> },
    { path: '/', element: <LandingPage /> },
];

export default routes;
