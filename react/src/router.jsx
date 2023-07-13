import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Signup from "./views/Signup";
import Login from "./views/Login";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Elections from "./views/Election";
import CreateElection from "./views/CreateElection";
import ElectionManagement from "./views/ElectionManagement";
import ElectionInformation from "./components/form/ElectionInformation";
import Position from "./components/form/Position";
import Partylist from "./components/form/Partylist";
import Voter from "./components/form/Voter";
import Candidate from "./components/form/Candidate";
import VotingLayout from "./components/VotingLayout";
import VotingForm from "./views/VotingForm";

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
                element: <ElectionManagement />,
                children: [
                    {
                        path: '/elections/:id/electionInformation',
                        element: <ElectionInformation />
                    },
                    {
                        path: '/elections/:id/position',
                        element: <Position />
                    },
                    {
                        path: '/elections/:id/partylist',
                        element: <Partylist />
                    },
                    {
                        path: '/elections/:id/candidate',
                        element: <Candidate />
                    },
                    {
                        path: '/elections/:id/voter',
                        element: <Voter />
                    },
                ]
            },
            {
                path: '/elections/create',
                element: <CreateElection />
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
    {
        path: '/voting',
        element: <VotingLayout />,
        children: [
            {
                path: '/voting/:id',
                element: <VotingForm />
            },
        ]
    },
])

export default router;