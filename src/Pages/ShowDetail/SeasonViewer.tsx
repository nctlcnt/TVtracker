import {
    Backdrop,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Grid,
    Snackbar,
    Typography,
} from '@mui/material'
import React, { Dispatch, useEffect } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import axios from 'axios'
import { useRequest } from 'ahooks'
import { EpisodeType, SeasonDetailType, ShowDetailType } from '@/common/tmdbTypes'
import { isBefore } from 'date-fns'
import { CheckRounded } from '@mui/icons-material'
import { getSeasonDetails } from '@/apis/tmdbAPI.ts'
import { getProgressUrl } from '@/apis/mongodbAPI.ts'
import { HistoryRequestProps } from '@/Pages/HistoryList'

export default ({
    seasonId,
    setSeasonId,
    showId,
}: {
    seasonId?: number
    setSeasonId?: Dispatch<number>
    showId?: string
    showDetail: ShowDetailType | null
}) => {
    const { tokens, userId } = React.useContext(GlobalContext)
    const { TMDBToken } = tokens
    const requestSeasonUrl = getSeasonDetails
        .replace('{series_id}', showId || '')
        .replace('{season_number}', String(seasonId))
    const [addingShowId, setAddingShowId] = React.useState<number | null>(null)
    const [addedShowIds, setAddedShowIds] = React.useState<number[]>([])
    const [error, setError] = React.useState<string | null>(null)
    const [seasonDetail, setSeasonDetail] = React.useState<SeasonDetailType | null>(null)
    const requestSeasonDetails = async () => {
        return axios.get(requestSeasonUrl, {
            params: {
                language: 'zh-CN',
            },
            headers: {
                Authorization: `Bearer ${TMDBToken}`,
            },
        })
    }

    const { run: getSeason } = useRequest(requestSeasonDetails, {
        manual: true,
        onSuccess: (data) => {
            console.log('getSeasonDetails', data.data as SeasonDetailType)
            setSeasonDetail(data.data as SeasonDetailType)
        },
    })

    const checkInRequest = (episode: EpisodeType) =>
        axios.post(getProgressUrl, {
            showId: Number(showId),
            episodeId: episode.id,
            episodeSeason: episode.season_number,
            episodeNumber: episode.episode_number,
            episodeTitle: episode.name,
            watchedAt: new Date().toISOString(),
            runtime: episode.runtime,
            aired: episode.air_date,
            createdBy: userId,
        } as HistoryRequestProps)
    const { run: addNewProgress } = useRequest(checkInRequest, {
        manual: true,
        onSuccess: (data) => {
            console.log('checkIn success', data)
            setAddedShowIds([...addedShowIds, addingShowId as number])
            setAddingShowId(null)
        },
        onError: (error) => {
            console.error('checkIn error', error)
            setAddingShowId(null)
            setError(error.message)
        },
    })

    const checkIn = (episode: EpisodeType) => {
        addNewProgress(episode)
        setAddingShowId(episode.id)
    }

    useEffect(() => {
        console.log('seasonId', seasonId)
        getSeason()
    }, [])

    return (
        <Box p={2}>
            <Backdrop open={addingShowId !== null} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress />
            </Backdrop>
            <Button onClick={() => setSeasonId && setSeasonId(0)} variant={'outlined'}>
                Close
            </Button>
            {seasonDetail && (
                <p>
                    {seasonDetail?.name || ''} ({seasonDetail?.air_date || ''})
                </p>
            )}
            {/*<Button onClick={getSeason}>getSeasonDetails</Button>*/}
            <Grid container={true} spacing={1} columns={{ xs: 2, md: 4 }}>
                {seasonDetail &&
                    seasonDetail.episodes.map((episode) => {
                        return (
                            <Grid item={true} key={episode.id}>
                                <Card sx={{ width: '100%' }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: '14px' }} color={'gray'}>
                                            {episode.episode_number}
                                        </Typography>
                                        <Typography variant={'h6'}>{episode.name}</Typography>
                                        <Typography variant={'body2'}>{episode.air_date}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        {addedShowIds.includes(episode.id) ? (
                                            <CheckRounded color={'success'} />
                                        ) : (
                                            <Button
                                                onClick={() => checkIn(episode)}
                                                disabled={isBefore(new Date(), new Date(episode.air_date))}
                                            >
                                                Check-in
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
            </Grid>
            <Snackbar
                open={!!error}
                message={error}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                onClose={() => setError(null)}
            />
        </Box>
    )
}
