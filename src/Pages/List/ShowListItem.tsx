import { RecordType } from '@/common/airtableTypes'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Box, Chip, Paper, Typography } from '@mui/material'
import { formatDate, formatDistanceToNow } from 'date-fns'

const ShowListItem = ({ show }: { show: RecordType }) => {
    const navigate = useNavigate()
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box>
                <Avatar
                    variant={'rounded'}
                    alt={show.fields.ShowTitle || ''}
                    src={`https://image.tmdb.org/t/p/w500${show.fields.poster}`}
                    style={{ width: 130, height: 130 }}
                    onClick={() => {
                        navigate(`/show/${show.fields.ID}`)
                    }}
                />
            </Box>
            <Box display={'flex'} flexDirection={'column'} flexGrow={1} p={1} maxHeight={130}>
                <Box textAlign={'left'} flexGrow={1}>
                    <Link to={`/show/${show.fields.ID}`}>{show.fields.Title}</Link>
                    {show.fields.LastWatched && (
                        <Typography variant={'body1'}>
                            {show.fields.status === 'Watched' ? <b>Finished at: </b> : <b>Last Watched: </b>}
                            {formatDate(new Date(show.fields.LastWatched), 'yyyy-MM-dd')}
                        </Typography>
                    )}
                    {!['Watching', 'Watched', 'Paused', 'Dropped'].includes(show.fields.status) && (
                        <Typography>
                            <b>In list from: </b>{' '}
                            {formatDistanceToNow(new Date(show.fields.Created), { addSuffix: true })}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Chip label={show.fields.status} size={'small'} variant={'outlined'} />
                </Box>
            </Box>
        </Paper>
    )
}

export default ShowListItem
