import { Backdrop, Box, CircularProgress, Fab, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'
import useRecommend from '@/Pages/landing/useRecommend.ts'
import HomeItemList from '@/Pages/landing/HomeItemList.tsx'
import NavigationIcon from '@mui/icons-material/Navigation'
import SearchBar from '@/common/Components/SearchBar.tsx'
import { HistoryItemRecord } from '@/common/types/mongo'
import { formatDate } from 'date-fns'
import TimelinePreview from '@/Pages/landing/TimelinePreview.tsx'
import WatchedTracker from '@/Pages/landing/WatchedTracker.tsx'
import useHistory from '@/Pages/landing/useHistory.ts'
import UserIcon from '@/common/Components/UserIcon.tsx'

const LandingPage = () => {
    useAuthCheck()
    const { gettingProgress } = useHistory()

    const { userSettings, historyData } = React.useContext(GlobalContext)
    const { recommendedTVs } = useRecommend()
    const lastWatched: HistoryItemRecord = historyData?.[0]
    return (
        <Stack direction={'row'} height={1}>
            <Backdrop open={gettingProgress} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stack
                sx={{
                    overflowY: 'auto',
                    paddingLeft: '17px',
                    marginLeft: '-17px',
                    justifyContent: 'space-between',
                    width: '60%',
                }}
            >
                <SearchBar />
                {userSettings._id ? (
                    <div>
                        <Typography lineHeight={0.7} variant={'h1'} className={'.linden-hill-regular'}>
                            Welcome back,
                        </Typography>
                        <Typography lineHeight={0.7} variant={'h1'}>
                            {userSettings.name}!
                        </Typography>
                        <Typography lineHeight={0.7} variant={'h6'}>
                            Ready for your next binge-watch? Let's dive in!
                        </Typography>
                    </div>
                ) : (
                    <div>
                        <Typography variant={'h1'}>Welcome!</Typography>
                        <Typography lineHeight={0.7} variant={'h6'}>
                            Ready to track your TV favorites? Sign in or create an account to get started!
                        </Typography>
                    </div>
                )}
                <Box>
                    <Fab variant="extended" size="medium" color="primary" sx={{ my: 3 }}>
                        <NavigationIcon sx={{ mr: 1 }} />
                        Start Searching
                    </Fab>
                </Box>
                <Box mt={4} mb={4}>
                    <Typography variant={'h5'} fontWeight={500} mb={2}>
                        Popular Now
                    </Typography>
                    <HomeItemList items={recommendedTVs} />
                </Box>
            </Stack>
            <Stack p={4} width={'40%'} position={'relative'}>
                <Box
                    bgcolor={'#EADFB4'}
                    position={'absolute'}
                    height={1}
                    width={1}
                    top={0}
                    left={0}
                    sx={{ opacity: 0.3 }}
                    zIndex={-1}
                ></Box>
                <UserIcon />
                <Stack direction={'row'} position={'relative'} mt={3} minHeight={180}>
                    <Paper elevation={4} sx={{ height: 150, width: 125, position: 'absolute', left: '-90px' }}>
                        {lastWatched && (
                            <img
                                alt={lastWatched.showDetails[0]?.showTitle || ''}
                                src={`https://image.tmdb.org/t/p/w500/${lastWatched.showDetails[0]?.posterPath}`}
                            />
                        )}
                    </Paper>
                    <Box sx={{ paddingLeft: '55px' }}>
                        <Typography variant={'subtitle2'}>Last Activity</Typography>
                        <Typography variant={'h4'}>{lastWatched?.showDetails[0]?.showTitle}</Typography>
                        <Typography variant={'h6'} py={1}>
                            {lastWatched?.episodeSeason ? lastWatched?.episodeSeason + 'x' : 'Special '}
                            {lastWatched?.episodeNumber} {lastWatched?.episodeTitle}
                        </Typography>
                        <Typography>
                            {lastWatched && formatDate(new Date(lastWatched?.watchedAt), 'yyyy-MM-dd')}
                        </Typography>
                    </Box>
                </Stack>
                <Box mt={3}>
                    <Typography variant={'h5'} fontWeight={500} mb={2}>
                        Recently Watched
                    </Typography>
                    <WatchedTracker />
                </Box>
                <Box mt={3} height={1}>
                    <Typography variant={'h5'} fontWeight={500} mb={2}>
                        Timeline
                    </Typography>
                    <Box overflow={'auto'}>
                        <TimelinePreview />
                    </Box>
                </Box>
            </Stack>
        </Stack>
    )
}
export default LandingPage
