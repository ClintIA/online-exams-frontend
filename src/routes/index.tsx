import {createBrowserRouter} from "react-router-dom";
import Root from "../App.tsx";
import LoginPatient from "../pages/LoginPatient.tsx";
import LoginAdmin from "../pages/LoginAdmin.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    },
    {
        path: "/login",
        children: [
            {
                path:'paciente',
                element: <LoginPatient />
            },
            {
                path:'admin',
                element: <LoginAdmin />
            }
        ]
    }
]);

