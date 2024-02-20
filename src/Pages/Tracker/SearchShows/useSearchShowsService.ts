import axios from 'axios'
import { useRequest } from 'ahooks'
import React, { useState } from 'react'
import { createRecordsUrl, searchProviders, searchTvShows } from '@/common/apis.ts'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { ShowDetailType, TMDBResults } from '@/common/tmdbTypes'
import { RecordType } from '@/common/airtableTypes'
import { ProviderRecords } from '@/common/types'

const useSearchShowsService = () => {
    const [result, setResult] = useState<TMDBResults>([] as TMDBResults)
    const { tokens, settings } = React.useContext(GlobalContext)
    const { TMDBToken, airtableToken, airtableBaseId } = tokens
    const addShowUrl = createRecordsUrl.replace('{baseId}', airtableBaseId).replace('{tableIdOrName}', 'show_database')
    const [addedShows, setAddedShows] = useState<number[]>([] as number[])

    const [providerResults, setProviderResults] = useState<ProviderRecords>([] as any)
    const getTvShows = (queryString: string) =>
        axios.get(searchTvShows, {
            params: {
                query: queryString,
                language: 'zh-CN',
            },
            headers: {
                Authorization: `Bearer ${TMDBToken}`,
            },
        })
    const { run: searchTvShow, loading } = useRequest(getTvShows, {
        manual: true,
        onSuccess: (result) => {
            console.log('result', result.data.results)
            setResult(result.data.results)
        },
    })

    const search = () => {
        const searchString = document.getElementById('searchString') as HTMLInputElement
        searchTvShow(searchString.value)
    }

    const postShow = (item: ShowDetailType) =>
        axios.post(
            addShowUrl,
            {
                records: [
                    {
                        fields: {
                            ID: item.id,
                            ShowTitle: `${item.name} (${item.original_name})`,
                            FirstAired: item.first_air_date,
                            poster: item.poster_path,
                            overview: item.overview,
                        },
                    },
                ],
            } as { records: Pick<RecordType, 'fields'>[] },
            {
                headers: {
                    Authorization: `Bearer ${airtableToken}`,
                },
            }
        )

    const { run: addShow, loading: addingShow } = useRequest(postShow, {
        manual: true,
        onSuccess: (data) => {
            console.log('addShow success', data)
            if (data.status === 200) {
                setAddedShows([...addedShows, data.data.records[0].fields.ID])
            }
        },
    })

    const getProviders = (id: string) => {
        const searchProvidersUrl: string = searchProviders.replace('{series_id}', id)
        return axios.get(searchProvidersUrl, {
            headers: {
                Authorization: `Bearer ${TMDBToken}`,
            },
        })
    }

    const { run: searchSteamProviders } = useRequest(getProviders, {
        manual: true,
        onSuccess: (data) => {
            console.log('searchProviders', data)
            setProviderResults(data.data.results)
        },
    })
    return {
        addShow,
        search,
        searchStreamProviders: searchSteamProviders,
        result,
        loading,
        addingShow,
        addedShows,
        settings,
        providerResults,
    }
}
export default useSearchShowsService
