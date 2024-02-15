import axios from 'axios';
import {useRequest} from "ahooks";
import {createRecordsUrl, searchProviders, searchTvShows} from "@/common/apis.ts";
import React, {useState} from "react";
import {IconButton, List, ListItem, ListItemText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {MinimizeRounded} from "@mui/icons-material";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import {ShowDetailType, TMDBResults} from "@/common/tmdbTypes";
import {RecordType} from "@/common/airtableTypes";


export default () => {
    const [result, setResult] = useState<TMDBResults>([] as TMDBResults)
    const {tokens} = React.useContext(GlobalContext)
    const {TMDBToken, airtableToken, airtableBaseId} = tokens
    const addShowUrl = createRecordsUrl.replace('{baseId}', airtableBaseId).replace('{tableIdOrName}', 'show_database')
    const getTvShows = (queryString: string) => {
        return axios.get(searchTvShows, {
            params: {
                query: queryString,
                language: 'zh-CN',
            },
            headers: {
                Authorization: `Bearer ${TMDBToken}`
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

    const postShow = (item: ShowDetailType) => {
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