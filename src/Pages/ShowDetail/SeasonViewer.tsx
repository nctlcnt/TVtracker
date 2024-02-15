import {Button, IconButton, List, ListItem, ListItemText} from "@mui/material";
import React, {Dispatch} from "react";
import {createRecordsUrl, getSeasonDetails} from "@/common/apis.ts";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import axios from "axios";
import {useRequest} from "ahooks";
import {EpisodeType, SeasonDetailType, ShowDetailType} from "@/common/tmdbTypes";
import {AddTaskRounded} from "@mui/icons-material";
import {EpisodeRecordType} from "@/common/airtableTypes";

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


    return (
        <div>
            <p>{seasonDetail?.name || ''} ({seasonDetail?.air_date || ''})</p>
            <Button onClick={getSeason}>getSeasonDetails</Button>
            <List>
                {seasonDetail && seasonDetail.episodes.map((episode) => {
                    return <ListItem key={episode.id} secondaryAction={<IconButton
                        onClick={() => checkIn(episode)}><AddTaskRounded/></IconButton>}>
                        <ListItemText primary={episode.episode_number} secondary={episode.name+episode.air_date}/>
                    </ListItem>

                })}
            </List>
            <Button onClick={() => setSeasonId && setSeasonId(0)}>Close</Button>
        </div>
    )
}