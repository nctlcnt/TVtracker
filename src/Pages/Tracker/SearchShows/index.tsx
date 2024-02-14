import axios from 'axios';
import {useRequest} from "ahooks";
import {createRecordsUrl, searchProviders, searchTvShows} from "@/common/apis.ts";
import {useState} from "react";
import {IconButton, List, ListItem, ListItemText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import useGlobalContext from "@/globalContext/useGlobalContext.ts";
import {RecordType} from "@/Pages/Tracker";
import {MinimizeRounded} from "@mui/icons-material";

type ResultType = {
    adult: boolean,
    backdrop_path: string,
    id: number,
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    first_air_date: string,
    name: string,
    vote_average: number,
    vote_count: number
}
type TMDBResults = Array<ResultType>
export default () => {
    const [result, setResult] = useState<TMDBResults>([] as TMDBResults)
    const {tokens} = useGlobalContext()
    const {TMDBToken, airtableToken, airtableBaseId} = tokens
    const addShowUrl = createRecordsUrl.replace('{baseId}', airtableBaseId).replace('{tableIdOrName}', 'show_database')
    const getTvShows = (queryString: string) => {
        return axios.get(searchTvShows, {
            params: {
                query: queryString,
                language: 'zh-CN',
            },
            headers: {
                Authorization: `Bearer ${document.cookie.match(/TMDBToken=([^;]+)/)?.[1]}`
            }
        })
    }
    const {run: searchTvShow, loading} = useRequest(getTvShows, {
        manual: true,
        onSuccess: (result) => {
            console.log('result', result.data.results)
            setResult(result.data.results)
        }
    })

    const search = () => {
        const searchString = document.getElementById('searchString') as HTMLInputElement
        searchTvShow(searchString.value)
    }

    const postShow = (item: ResultType) => {
        return axios.post(addShowUrl, {
            records: [
                {
                    fields: {
                        ID: item.id,
                        ShowTitle: `${item.name} (${item.original_name})`,
                        FirstAired: item.first_air_date,
                    }
                }
            ]
        } as { records: Pick<RecordType, 'fields'>[] }, {
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

    const getProviders = (id: string) => {
        const searchProvidersUrl: string = searchProviders.replace('{series_id}', id)
        return axios.get(searchProvidersUrl, {
            headers: {
                Authorization: `Bearer ${TMDBToken}`
            }
        })
    }

    const {run: searchSteamProviders} = useRequest(getProviders, {
        manual: true,
        onSuccess: (data) => {
            console.log('searchProviders', data)
        }

    })

    return (
        <div>
            <input className={'border-2'} id={'searchString'}/>
            <button onClick={search}>Search</button>
            {loading && <p>loading...</p>}
            <List>
                {result.map((item: any) =>
                    <ListItem key={item.id}
                              secondaryAction={<><IconButton
                                  onClick={() => addShow(item)}><AddIcon/></IconButton><IconButton
                                  onClick={() => searchSteamProviders(item.id)}><MinimizeRounded/></IconButton></>}>
                        <ListItemText primary={item.name} secondary={item.overview}/>
                    </ListItem>)
                }
            </List>
        </div>
    )
}