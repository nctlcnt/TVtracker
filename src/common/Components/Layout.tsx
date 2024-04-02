import { Box, IconButton, Stack } from '@mui/material'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import Canvas from '@/common/Components/Canvas.tsx'
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SearchBar from '@/common/Components/SearchBar.tsx'

export default () => {
    const navigate = useNavigate()
    const isHome = useMatch('/')

    return (
        <Box display={'flex'} height={'100vh'}>
            <Canvas />
            <Box height={'100%'} display={'flex'}>
                <Box
                    height={'90%'}
                    borderRight={'#0000001f solid 1px'}
                    margin="auto"
                    p={1}
                    px={3}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <IconButton onClick={() => navigate('/')}>
                        <HomeRoundedIcon />
                    </IconButton>
                    <Stack gap={3} flexGrow={1} justifyContent={'center'}>
                        <IconButton onClick={() => navigate('/list')}>
                            <FeaturedPlayListOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={() => navigate('/history')}>
                            <ScheduleOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={() => navigate('/settings')}>
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>

            <Box
                flexGrow={1}
                pl={4}
                height={'100%'}
                display={'flex'}
                flexDirection={'column'}
                sx={{ ...(!isHome && { overflowY: 'auto' }) }}
            >
                {!isHome && <SearchBar />}
                <Outlet />
            </Box>
        </Box>
    )
}
