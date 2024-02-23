import { Box, Stack } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'

export default () => {
    useAuthCheck()
    return (
        <Box>
            <Stack direction={'row'} gap={2}>
                <Link to={'/'}>Home</Link>
                <Link to={'/settings'}>Settings</Link>
                <Link to={'/tracker'}>Tracker</Link>
                <Link to={'/list'}>List</Link>
                <Link to={'/history'}>History</Link>
            </Stack>
            <Box flexGrow={1}>
                <Outlet />
            </Box>
        </Box>
    )
}
