import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Chip, Paper, Typography } from '@mui/material'
import { formatDate, formatDistanceToNow } from 'date-fns'
import React from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { ShowListItemRecord } from '@/common/types/mongo'

const ShowListItem = ({ show }: { show: ShowListItemRecord }) => {
    const navigate = useNavigate()
    const {
        tokens: { TMDBToken },
    } = React.useContext(GlobalContext)
    const handleClick = () => {
        if (!TMDBToken) {
            navigate(`/tracker`)
        }
        navigate(`/show/${show.showId}`)
    }
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box>
                <Avatar
                    variant={'rounded'}
                    alt={show.showTitle || ''}
                    src={`https://image.tmdb.org/t/p/w500${show.posterPath}`}
                    style={{ width: 130, height: 130 }}
                    onClick={handleClick}
                />
            </Box>
            <Box display={'flex'} flexDirection={'column'} flexGrow={1} p={1} maxHeight={130}>
                <Box textAlign={'left'} flexGrow={1}>
                    <Typography>{show.showTitle}</Typography>
                    {show.latestProgress?.[0]?.watchedAt && (
                        <Typography variant={'body1'}>
                            {show.status === 'Watched' ? <b>Finished at: </b> : <b>Last Watched: </b>}
                            {formatDate(new Date(show.latestProgress[0].watchedAt), 'yyyy-MM-dd')}
                        </Typography>
                    )}
                    {!['Watching', 'Watched', 'Paused', 'Dropped'].includes(show.status) && (
                        <Typography>
                            <b>In list from: </b> {formatDistanceToNow(new Date(show.created), { addSuffix: true })}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Chip label={show.status} size={'small'} variant={'outlined'} />
                </Box>
            </Box>
        </Paper>
    )
}

export default ShowListItem
