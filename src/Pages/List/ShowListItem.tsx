import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Box, Chip, Paper, Typography } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import { ShowType } from '@/Pages/search/SearchShows/useSearchShowsService.ts'

const ShowListItem = ({ show }: { show: ShowType }) => {
    const navigate = useNavigate()
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box>
                <Avatar
                    variant={'rounded'}
                    alt={show.showTitle || ''}
                    src={`https://image.tmdb.org/t/p/w500${show.posterPath}`}
                    style={{ width: 130, height: 130 }}
                    onClick={() => {
                        navigate(`/show/${show.showId}`)
                    }}
                />
            </Box>
            <Box display={'flex'} flexDirection={'column'} flexGrow={1} p={1} maxHeight={130}>
                <Box textAlign={'left'} flexGrow={1}>
                    <Link to={`/show/${show.showId}`}>{show.showTitle}</Link>
                    {/*{show.LastWatched && (*/}
                    {/*    <Typography variant={'body1'}>*/}
                    {/*        {show.status === 'Watched' ? <b>Finished at: </b> : <b>Last Watched: </b>}*/}
                    {/*        {formatDate(new Date(show.LastWatched), 'yyyy-MM-dd')}*/}
                    {/*    </Typography>*/}
                    {/*)}*/}
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
