import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import SaveInitInformation from "src/Pages/InitComponent";
import Tracker from "@/Pages/Tracker";
import List from "@/Pages/List";
import ShowDetail from "@/Pages/ShowDetail";
import HistoryList from "@/Pages/HistoryList";

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
    {
        path: "history",
        element: <HistoryList/>
    }
]);
export default () =>
    <RouterProvider router={router}/>
