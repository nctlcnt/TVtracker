import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import SaveInitInformation from "@/Pages/SaveInitInformation";
import Tracker from "@/Pages/Tracker";
import List from "@/Pages/List";
import ShowDetail from "@/Pages/ShowDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SaveInitInformation/>,
    },
    {
        path: "tracker",
        element: <Tracker/>,
    },
    {
        path: "list",
        element: <List/>,
    },
    {
        path: "show/:id",
        element: <ShowDetail/>,
    },
]);
export default () =>
    <RouterProvider router={router}/>
