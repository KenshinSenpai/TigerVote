import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Signup from "./views/Signup";
import Login from "./views/Login";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Elections from "./views/Election";
import CreateElection from "./views/CreateElection";
import ManageElection from "./views/ManageElection";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to='/' />
            },
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/elections',
                element: <Elections />
            },
            {
                path: '/elections/create',
                element: <CreateElection />
            },
            {
                path: '/elections/:id',
                element: <ManageElection />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
])

export default router;