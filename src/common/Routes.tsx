import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import SaveInitInformation from 'src/Pages/InitComponent'
import Tracker from 'src/Pages/search'
import List from 'src/Pages/list'
import ShowDetail from '@/Pages/ShowDetail'
import HistoryList from '@/Pages/HistoryList'
import Landing from '@/Pages/landing'
import Settings from '@/Pages/settings'
import Layout from '@/common/Components/Layout.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
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
                path: 'history',
                element: <HistoryList />,
            },
            {
                path: 'show/:id',
                element: <ShowDetail />,
            },
        ],
    },
])
export default () => <RouterProvider router={router} />
