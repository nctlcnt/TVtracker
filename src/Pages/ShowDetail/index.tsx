import { Link, useParams } from 'react-router-dom'
import { getTvShowDetails } from '@/common/apis.ts'
import axios from 'axios'
import { useRequest } from 'ahooks'
import { ShowDetailType } from '@/common/tmdbTypes'
import React, { useEffect } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { Avatar, Box, Button, Divider, Drawer, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import SeasonViewer from '@/Pages/ShowDetail/SeasonViewer.tsx'
import { RecordType } from '@/common/airtableTypes'

export default () => {
    const { id } = useParams()
    const { tokens, showData } = React.useContext(GlobalContext)
    const { TMDBToken } = tokens
    const [seasonId, setSeasonId] = React.useState<number | null>(null)
    const [showDetail, setShowDetail] = React.useState<ShowDetailType | null>(null)
    const [show] = React.useState<RecordType | null>(
        showData.filter((show) => String(show.fields.ID) === id)[0] || null
    )

    console.log(showData, id, show)
    const requestShowDetails = async () => {
        const requestUrl = getTvShowDetails.replace('{series_id}', id || '')
        return axios.get(requestUrl, {
            params: {
                language: 'zh-CN',
            },
            headers: {
                Authorization: `Bearer ${TMDBToken}`,
            },
        })
    }
    const { run: getShowDetails } = useRequest(requestShowDetails, {
        manual: true,
        onSuccess: (data) => {
            console.log('getShowDetails', data.data as ShowDetailType)
            setShowDetail(data.data as ShowDetailType)
        },
    })

    useEffect(() => {
        console.log('id', id)
        getShowDetails()
    }, [id])
    return (
        <div>
            <Link to={'/list'}>Go Back</Link>
            {showDetail && (
                <div>
                    <h1>
                        {showDetail.name}
                        {showDetail.original_name && (
                            <Typography variant={'caption'}>({showDetail.original_name})</Typography>
                        )}
                    </h1>
                    <h2>{'S' + show?.fields.ProgressSeason + 'E' + show?.fields.ProgressEpisode}</h2>
                    <Stack direction={{ xs: 'column', sm: 'row' }}>
                        <Avatar
                            src={`https://image.tmdb.org/t/p/w500${showDetail.poster_path}`}
                            alt={showDetail.name}
                            variant={'rounded'}
                            sx={{
                                width: 200,
                                height: 200,
                            }}
                        />
                        <Divider sx={{ m: 1 }} />
                        <Box textAlign={'left'}>
                            <p>First Air Date: {showDetail.first_air_date}</p>
                            <p>{showDetail.overview}</p>
                        </Box>
                    </Stack>
                    <List>
                        {showDetail.seasons.map((season) => {
                            return (
                                <ListItem key={season.id}>
                                    <ListItemText primary={season.name} secondary={season.air_date} />
                                    <Button onClick={() => setSeasonId(season.season_number)}>Open</Button>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            )}
            <Drawer open={!!seasonId} anchor={'bottom'} sx={{ '.MuiPaper-root.MuiDrawer-paper': { maxHeight: '60%' } }}>
                <SeasonViewer seasonId={seasonId || 0} setSeasonId={setSeasonId} showId={id} showDetail={showDetail} />
            </Drawer>
        </div>
    )
}
