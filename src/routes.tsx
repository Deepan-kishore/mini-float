import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import Layout from "./components/Layout/Layout";
import UserTable from "./components/Teams/Team";

export const AppRouter = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children:[
            {
                path:'/',
                element:<App/>
            },
            {
                path:'teams',
                element:<UserTable/>
            },
            {
                path: '*',
element:<div>Development in Progress</div>
            }
        ]
    }
])