import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import SaveInitInformation from 'src/Pages/InitComponent'
import Tracker from 'src/Pages/search'
import List from '@/Pages/List'
import ShowDetail from '@/Pages/ShowDetail'
import HistoryList from '@/Pages/HistoryList'
import Landing from '@/Pages/landing'
import Settings from '@/Pages/settings'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
    {
        path: '/settings',
        element: <Settings />,
    },
    {
        path: 'tracker',
        element: <Tracker />,
    },
    {
        path: 'list',
        element: <List />,
    },
    {
        path: 'show/:id',
        element: <ShowDetail />,
    },
    {
        path: 'history',
        element: <HistoryList />,
    },
])
export default () => <RouterProvider router={router} />
