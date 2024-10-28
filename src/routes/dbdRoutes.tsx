import DBDLandingPage from "@components/dbd/DBDLandingPage";
import GenerateRandomBuild from "@components/dbd/GenerateRandomBuild";

const dbdRoutes = [
    { path: "/dbd/", element: <DBDLandingPage /> },
    { path: "/dbd/random/build", element: <GenerateRandomBuild /> }
];

export default dbdRoutes;
