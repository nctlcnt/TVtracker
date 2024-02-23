import { Backdrop, Box, CircularProgress, IconButton, List, Snackbar, Typography } from '@mui/material'
import React, { Dispatch, useEffect } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import axios from 'axios'
import { useRequest } from 'ahooks'
import { getSeasonDetails } from '@/apis/tmdbAPI.ts'
import { dbHistoryRequest } from '@/apis/mongodbAPI.ts'
import EpisodeItem from '@/Pages/ShowDetail/EpisodeItem.tsx'
import { Link } from 'react-router-dom'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import { APISeasonInfoType, APIEpisodeInfoType } from '@/common/types/tmdb'
import { ProgressHistoryEntry } from '@/common/types/mongo'

export default ({
    seasonId,
    setSeasonId,
    showId,
}: {
    seasonId: string | null
    setSeasonId?: Dispatch<string | null>
    showId?: string
}) => {
    const { tokens, userId } = React.useContext(GlobalContext)
    if (!userId) {
        return <Link to={'/'}>Go Back</Link>
    }
    const { TMDBToken } = tokens
    const requestSeasonUrl = getSeasonDetails
        .replace('{series_id}', showId || '')
        .replace('{season_number}', String(seasonId))
    const [addingShowId, setAddingShowId] = React.useState<number | null>(null)
    const [addedShowIds, setAddedShowIds] = React.useState<number[]>([])
    const [error, setError] = React.useState<string | null>(null)
    const [seasonDetail, setSeasonDetail] = React.useState<APISeasonInfoType | null>(null)
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

    const { run: getSeason, loading } = useRequest(requestSeasonDetails, {
        manual: true,
        onSuccess: (data) => {
            console.log('getSeasonDetails', data.data as APISeasonInfoType)
            setSeasonDetail(data.data as APISeasonInfoType)
        },
    })

    const checkInRequest = (episode: APIEpisodeInfoType) =>
        axios.post(dbHistoryRequest, {
            showId: Number(showId),
            episodeId: episode.id,
            episodeSeason: episode.season_number,
            episodeNumber: episode.episode_number,
            episodeTitle: episode.name,
            watchedAt: new Date().toISOString(),
            runtime: episode.runtime,
            aired: episode.air_date,
            createdBy: userId,
        } as ProgressHistoryEntry)
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

    const checkIn = (episode: APIEpisodeInfoType) => {
        addNewProgress(episode)
        setAddingShowId(episode.id)
    }

    useEffect(() => {
        console.log('seasonId', seasonId)
        getSeason()
    }, [])

    return (
        <Box p={2}>
            <Backdrop open={addingShowId !== null || loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress />
            </Backdrop>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                {seasonDetail && (
                    <Typography display={'inline-block'}>
                        {seasonDetail?.name || ''} ({seasonDetail?.air_date || ''})
                    </Typography>
                )}
                <IconButton onClick={() => setSeasonId && setSeasonId(null)}>
                    <HighlightOffRoundedIcon color={'error'} />
                </IconButton>
            </Box>

            <List>
                {seasonDetail &&
                    seasonDetail.episodes.map((episode: APIEpisodeInfoType) => {
                        return (
                            <EpisodeItem
                                episode={episode}
                                addedShowIds={addedShowIds}
                                checkIn={checkIn}
                                key={episode.id}
                            />
                        )
                    })}
            </List>
            <Snackbar
                open={!!error}
                message={error}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                onClose={() => setError(null)}
            />
        </Box>
    )
}
