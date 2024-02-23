import { Link, useNavigate, useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import React, { useEffect } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { Avatar, Box, Button, Divider, Drawer, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import SeasonViewer from '@/Pages/ShowDetail/SeasonViewer.tsx'
import { getTvShowDetails } from '@/apis/tmdbAPI.ts'
import { APIShowDetailType } from '@/common/types/tmdb'
import { ShowListItemRecord } from '@/common/types/mongo'
import tmdb from '@/common/tmdbRequest.ts'
import { formatDate } from 'date-fns'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'

export default () => {
    useAuthCheck()
    const { id } = useParams()
    const { showData } = React.useContext(GlobalContext)
    const [seasonId, setSeasonId] = React.useState<string | null>(null)
    const [showDetail, setShowDetail] = React.useState<APIShowDetailType | null>(null)
    const [show] = React.useState<ShowListItemRecord>(showData.filter((show) => String(show.showId) === id)[0])

    console.log(showData, id, show)
    const requestShowDetails = async () => {
        const requestUrl = getTvShowDetails.replace('{series_id}', id || '')
        return tmdb.get(requestUrl, {
            params: {
                language: 'zh-CN',
            },
        })
    }
    const { run: getShowDetails } = useRequest(requestShowDetails, {
        manual: true,
        onSuccess: (data) => {
            console.log('getShowDetails', data.data as APIShowDetailType)
            setShowDetail(data.data as APIShowDetailType)
        },
    })
    const navigate = useNavigate()

    useEffect(() => {
        console.log('id', id)
        getShowDetails()
    }, [id])

    useEffect(() => {
        if (!show) {
            navigate('/list')
        }
    }, [])

    const randomHexColorCode = (seed: number) => {
        let randomNumber = seed ? Number('0.' + seed.toString()) : Math.random()
        let n = (randomNumber * 0xfffff * 1000000).toString(16)
        // console.log(n)
        return '#' + n.slice(2, 8)
    }
    return (
        <div
            style={{
                background: '#f3e8d7',
                minHeight: '100vh',
                padding: '16px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Stack gap={2} mb={3}>
                <Divider />
                <Link to={'/list'}>Go Back</Link>
                <Divider />
            </Stack>
            {showDetail?.poster_path && (
                <Avatar
                    src={`https://image.tmdb.org/t/p/w500${showDetail.poster_path}`}
                    alt={showDetail.name}
                    variant={'rounded'}
                    sx={{
                        position: 'absolute',
                        right: '-9%',
                        top: '-3%',
                        borderRadius: '50%',
                        height: 'calc(0.4  * 100vh)',
                        width: 'calc(0.4  * 100vh)',
                    }}
                />
            )}

            {showDetail && show && (
                <Box mt={'calc(0.3 * 100vh)'} position={'relative'}>
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '-11%',
                            top: '9%',
                            borderRadius: '50%',
                            height: 'calc(0.6  * 100vh)',
                            width: 'calc(0.6  * 100vh)',
                            backgroundColor: randomHexColorCode(showDetail.id),
                            maxWidth: '100vw',
                            maxHeight: '100vw',
                            opacity: 0.4,
                        }}
                    ></Box>
                    <Typography variant={'h3'}>{showDetail.name}</Typography>
                    {showDetail.original_name && (
                        <Typography variant={'subtitle1'}>({showDetail.original_name})</Typography>
                    )}
                    {show.latestProgress.length > 0 && (
                        <Typography color={'primary'}>
                            {formatDate(new Date(show.latestProgress[0].watchedAt), 'yyyy-MM-dd')}
                            {show.status === 'Watched'
                                ? ' Finished'
                                : ` Last Watched: ${show.latestProgress[0].episodeSeason}x${show.latestProgress[0].episodeNumber}`}
                        </Typography>
                    )}

                    <Stack direction={{ xs: 'column', sm: 'row' }}>
                        <Divider sx={{ m: 1 }} />
                        <Box textAlign={'left'}>
                            <p>First Air Date: {showDetail.first_air_date}</p>
                            <p>{showDetail.overview}</p>
                        </Box>
                    </Stack>
                    <Box bgcolor={'#494949'} p={3} borderRadius={'24px'} mt={2} position={'relative'}>
                        <List>
                            {showDetail.seasons.map((season) => {
                                return (
                                    <ListItem key={season.id}>
                                        <ListItemText
                                            primary={season.name}
                                            secondary={season.air_date}
                                            sx={{
                                                '& .MuiListItemText-secondary': { opacity: 0.4, color: '#f3e8d7' },
                                                color: '#f3e8d7',
                                            }}
                                        />
                                        <Button onClick={() => setSeasonId(String(season.season_number))}>Open</Button>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Box>
            )}

            <Drawer open={!!seasonId} anchor={'bottom'} sx={{ '.MuiPaper-root.MuiDrawer-paper': { height: '100%' } }}>
                <SeasonViewer seasonId={seasonId || null} setSeasonId={setSeasonId} showId={id} />
            </Drawer>
        </div>
    )
}
