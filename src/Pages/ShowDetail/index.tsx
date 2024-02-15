import {Link, useParams} from "react-router-dom";
import {getTvShowDetails} from "@/common/apis.ts";
import axios from "axios";
import {useRequest} from "ahooks";
import {ShowDetailType} from "@/common/tmdbTypes";
import React, {useEffect} from "react";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import {Button, Dialog, List, ListItem, ListItemText} from "@mui/material";
import SeasonViewer from "@/Pages/ShowDetail/SeasonViewer.tsx";

export default () => {
    const {id} = useParams()
    const {tokens} = React.useContext(GlobalContext)
    const {TMDBToken} = tokens
    const [seasonId, setSeasonId] = React.useState<number | null>(null)

    const [showDetail, setShowDetail] = React.useState<ShowDetailType | null>(null)
    const requestShowDetails = async () => {
        const requestUrl = getTvShowDetails.replace('{series_id}', id || '')
        return axios.get(requestUrl, {
                params: {
                    language: 'zh-CN',
                },
                headers: {
                    Authorization: `Bearer ${TMDBToken}`
                },
            }
        )
    }
    const {run: getShowDetails} = useRequest(requestShowDetails, {
        manual: true,
        onSuccess: (data) => {
            console.log('getShowDetails', data.data as ShowDetailType)
            setShowDetail(data.data as ShowDetailType)
        }
    })

    useEffect(() => {
        console.log('id', id)
        getShowDetails()
    }, [id]);
    return <div>
        <Link to={'..'}>Go Back</Link>
        {
            showDetail && <div>
                <h1>{showDetail.name} ({showDetail.original_name})</h1>
                <h2>{id}</h2>
                <p>{showDetail.overview}</p>
                <img src={`https://image.tmdb.org/t/p/w500${showDetail.poster_path}`} alt={showDetail.name}/>
                <p>First Air Date: {showDetail.first_air_date}</p>
                <List>
                    {showDetail.seasons.map((season) => {
                        return <ListItem key={season.id}>
                            <ListItemText primary={season.name} secondary={season.air_date}/>
                            <Button onClick={() => setSeasonId(season.season_number)}>Open</Button>
                        </ListItem>
                    })}
                </List>
            </div>
        }
        <Dialog open={!!seasonId}>
            <SeasonViewer seasonId={seasonId || 0} setSeasonId={setSeasonId} showId={id} showDetail={showDetail}/>
        </Dialog>
    </div>

}