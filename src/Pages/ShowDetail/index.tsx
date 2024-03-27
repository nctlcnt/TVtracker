import { useNavigate, useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import React, { useEffect } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Fab,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import SeasonViewer from '@/Pages/ShowDetail/SeasonViewer.tsx'
import { getTvShowDetails } from '@/apis/tmdbAPI.ts'
import { APIShowDetailType } from '@/common/types/tmdb'
import { ShowListItemRecord } from '@/common/types/mongo'
import { formatDate } from 'date-fns'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'
import useAxios from '@/common/tmdbRequest.ts'
import NavigationIcon from '@mui/icons-material/Navigation'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'

export default () => {
    useAuthCheck()
    const { id } = useParams()
    const { showData } = React.useContext(GlobalContext)
    const [seasonId, setSeasonId] = React.useState<string | null>(null)
    const [showDetail, setShowDetail] = React.useState<APIShowDetailType | null>(null)
    const [show] = React.useState<ShowListItemRecord>(showData.filter((show) => String(show.showId) === id)[0])
    const axios = useAxios()

    console.log(showData, id, show)
    const requestShowDetails = async () => {
        const requestUrl = getTvShowDetails.replace('{series_id}', id || '')
        return axios.get(requestUrl, {
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
        getShowDetails()
    }, [id])

    useEffect(() => {
        if (!show) {
            // navigate('/list')
        }
    }, [])

    if (!showDetail) return null
    return (
        <>
            <Stack px={6}>
                <Grid direction={'row'} container px={6} zIndex={1}>
                    <Grid item display={'flex'} flexDirection={'column'} xs={1} justifyContent={'center'}>
                        <Stack>
                            <IconButton>
                                <KeyboardArrowUpOutlinedIcon />
                            </IconButton>
                            <IconButton>
                                <KeyboardArrowDownOutlinedIcon />
                            </IconButton>
                        </Stack>
                    </Grid>

                    {showDetail?.poster_path && (
                        <Grid item xs={4} display={'flex'} px={6} justifyContent={'center'}>
                            <Paper elevation={6} sx={{ width: '90%' }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${showDetail.poster_path}`}
                                    alt={showDetail.name}
                                />
                            </Paper>
                        </Grid>
                    )}
                    {showDetail && show && (
                        <Grid item xs={6} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
                            <Stack>
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
                            </Stack>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                borderBottom={'rgb(128 128 128 / 19%) 1px solid'}
                            >
                                <Fab variant="extended" size="medium" color="primary" sx={{ my: 3 }}>
                                    <NavigationIcon sx={{ mr: 1 }} />
                                    View Providers
                                </Fab>
                                <Box>
                                    <IconButton>
                                        <BookmarkAddOutlinedIcon />
                                    </IconButton>
                                    <IconButton>
                                        <FavoriteBorderOutlinedIcon />
                                    </IconButton>
                                    <IconButton>
                                        <InsertLinkOutlinedIcon />
                                    </IconButton>
                                </Box>
                            </Stack>
                        </Grid>
                    )}
                </Grid>
                <Grid container p={6} pt={14} mt={-10} position={'relative'}>
                    <Box
                        bgcolor={'white'}
                        sx={{ opacity: 0.6, height: 1, width: 1, position: 'absolute', zIndex: -1, top: 0, left: 0 }}
                    ></Box>
                    <Grid item xs={7} px={7}>
                        <>
                            {showDetail.seasons.map((season) => {
                                return (
                                    <Accordion
                                        sx={{
                                            border: 'none',
                                            boxShadow: 'none',
                                            background: 'transparent',
                                        }}
                                        key={season.id}
                                        expanded={seasonId === String(season.season_number)}
                                        onChange={() =>
                                            setSeasonId(
                                                seasonId === String(season.season_number)
                                                    ? ''
                                                    : String(season.season_number)
                                            )
                                        }
                                    >
                                        <AccordionSummary>
                                            <Typography variant={'h6'}>{season.name}</Typography>
                                            <Typography variant={'subtitle2'}>
                                                {season.episode_count + ' episodes'}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {seasonId && (
                                                <SeasonViewer
                                                    seasonId={seasonId || null}
                                                    setSeasonId={setSeasonId}
                                                    showId={id}
                                                />
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}
                        </>
                    </Grid>
                    <Grid item xs={5} px={3}>
                        <Box textAlign={'left'}>
                            <p>First Air Date: {showDetail.first_air_date}</p>
                            <p>{showDetail.overview}</p>
                            {showDetail.status}
                            {showDetail.last_episode_to_air && (
                                <p>
                                    Last Episode: {showDetail.last_episode_to_air.name}{' '}
                                    {formatDate(new Date(showDetail.last_episode_to_air.air_date), 'yyyy-MM-dd')}
                                </p>
                            )}
                            {showDetail.next_episode_to_air && (
                                <p>
                                    Next Episode: {showDetail.next_episode_to_air.name}{' '}
                                    {formatDate(new Date(showDetail.next_episode_to_air.air_date), 'yyyy-MM-dd')}
                                </p>
                            )}
                            {showDetail.production_countries &&
                                showDetail.production_countries.map((country) => {
                                    return <p key={country.iso_3166_1}>Country: {country.name}</p>
                                })}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign={'center'}>
                            <Button onClick={() => navigate('/list')}>Back</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
}
