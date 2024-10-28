import DBDLandingPage from "../components/dbd/DBDLandingPage.tsx";
import LandingPage from "../components/LandingPage.tsx";

const routes = [
    {
        path: "/dbd/",
        element: <DBDLandingPage />
    },
    {
        path: "/",
        element: <LandingPage />
    },
];

export default routes;
