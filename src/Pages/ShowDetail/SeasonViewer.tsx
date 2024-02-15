import {
    Box,
    Button,
    Card, CardActions,
    CardContent,
    Grid,
    Typography
} from "@mui/material";
import React, {Dispatch, useEffect} from "react";
import {createRecordsUrl, getSeasonDetails} from "@/common/apis.ts";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import axios from "axios";
import {useRequest} from "ahooks";
import {EpisodeType, SeasonDetailType, ShowDetailType} from "@/common/tmdbTypes";
import {EpisodeRecordType} from "@/common/airtableTypes";
import {isBefore} from "date-fns";

export default ({seasonId, setSeasonId, showId, showDetail}: {
    seasonId?: number,
    setSeasonId?: Dispatch<number>,
    showId?: string
    showDetail: ShowDetailType | null
}) => {
    const {tokens} = React.useContext(GlobalContext)
    const {TMDBToken} = tokens
    const requestSeasonUrl = getSeasonDetails.replace('{series_id}', showId || '').replace('{season_number}', String(seasonId))
    const {airtableToken, airtableBaseId} = tokens
    const addShowUrl = createRecordsUrl.replace('{baseId}', airtableBaseId).replace('{tableIdOrName}', 'episode_tracker')

    const [seasonDetail, setSeasonDetail] = React.useState<SeasonDetailType | null>(null)
    const requestSeasonDetails = async () => {
        return axios.get(requestSeasonUrl, {
                params: {
                    language: 'zh-CN',
                },
                headers: {
                    Authorization: `Bearer ${TMDBToken}`
                },
            }
        )

    }

    const {run: getSeason} = useRequest(requestSeasonDetails, {
        manual: true,
        onSuccess: (data) => {
            console.log('getSeasonDetails', data.data as SeasonDetailType)
            setSeasonDetail(data.data as SeasonDetailType)
        }
    })

    const postShow = (item: EpisodeType) => {
        return axios.post(addShowUrl, {
            records: [
                {
                    fields: {
                        ShowTitle: showDetail?.name,
                        EpisodeSeason: item.season_number,
                        EpisodeNumber: item.episode_number,
                        EpisodeTitle: item.name,
                        WatchedAt: new Date().toISOString(),
                        Aired: item.air_date,
                        Runtime: item.runtime,
                        EpisodeId: item.id,
                        ShowId: showDetail?.id,
                    }
                }
            ]
        } as { records: Pick<EpisodeRecordType, 'fields'>[] }, {
            headers: {
                Authorization: `Bearer ${airtableToken}`
            }
        })
    }


    const {run: addShow} = useRequest(postShow, {
        manual: true,
        onSuccess: (data) => {
            console.log('addShow success', data)
        }
    })

    const checkIn = (episode: EpisodeType) => {
        addShow(episode)
    }

    useEffect(() => {
        console.log('seasonId', seasonId)
        getSeason()
    }, []);

    return (
        <Box p={2}>
            <Button onClick={() => setSeasonId && setSeasonId(0)} variant={'outlined'}>Close</Button>
            {seasonDetail && <p>{seasonDetail?.name || ''} ({seasonDetail?.air_date || ''})</p>}
            {/*<Button onClick={getSeason}>getSeasonDetails</Button>*/}
            <Grid container={true} spacing={1}>
                {
                    seasonDetail && seasonDetail.episodes.map((episode) => {
                        return <Grid item={true} key={episode.id} sx={{width: '20%'}}>
                            <Card sx={{minWidth: '100px'}}>
                                <CardContent>
                                    <Typography sx={{fontSize: '14px'}} color={'gray'}>{episode.episode_number}</Typography>
                                    <Typography variant={'h6'}>{episode.name}</Typography>
                                    <Typography variant={'body2'}>{episode.air_date}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => checkIn(episode)}
                                            disabled={isBefore(new Date(), new Date(episode.air_date))}>
                                        Check-in
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    })
                }
            </Grid>
        </Box>
    )
}