import { useRequest } from 'ahooks'
import React, { useState } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { ProviderRecords } from '@/common/types/types'
import { searchProviders, searchTvShows } from '@/apis/tmdbAPI.ts'
import { dbShowsRequest } from '@/apis/mongodbAPI.ts'
import { APIShowDetailType, APIShowListItemType } from '@/common/types/tmdb'
import { ShowEntry } from '@/common/types/mongo'
import useAxios from '@/common/tmdbRequest.ts'

const useSearchShowsService = () => {
    const [result, setResult] = useState<APIShowListItemType[]>([])
    const {
        tokens,
        userSettings: { preferredRegions },
        userId,
    } = React.useContext(GlobalContext)
    const { TMDBToken } = tokens
    const [addedShows] = useState<number[]>([] as number[])
    const axios = useAxios()

    const [providerResults, setProviderResults] = useState<ProviderRecords>([] as any)
    const requestSearchShows = (queryString: string) =>
        axios.get(searchTvShows, {
            params: {
                query: queryString,
                language: 'zh-CN',
            },
        })
    const { run: searchTvShow, loading } = useRequest(requestSearchShows, {
        manual: true,
        onSuccess: (result: any) => {
            console.log('result', result.data.results)
            setResult(result.data.results as APIShowListItemType[])
        },
    })

    const search = () => {
        const searchString = document.getElementById('searchString') as HTMLInputElement
        searchTvShow(searchString.value)
    }

    const getProviders = (id: string) => {
        const searchProvidersUrl: string = searchProviders.replace('{series_id}', id)
        return axios.get(searchProvidersUrl, {
            headers: {
                Authorization: `Bearer ${TMDBToken}`,
            },
        })
    }

    const { run: searchStreamProviders } = useRequest(getProviders, {
        manual: true,
        onSuccess: (data) => {
            console.log('searchProviders', data)
            setProviderResults(data.data.results)
        },
    })

    const postShow = (item: APIShowDetailType) =>
        axios.post(dbShowsRequest, {
            showId: item.id,
            status: 'In List',
            showTitle: item.name,
            availableAt: [],
            watchingAt: [],
            posterPath: item.poster_path,
            firstAired: item.first_air_date,
            originalTitle: item.original_name,
            createdBy: userId,
            created: new Date().toISOString(),
        } as ShowEntry)

    const { run: addShow, loading: addingShow } = useRequest(postShow, {
        manual: true,
        onSuccess: (data) => {
            console.log('addShow success', data)
        },
    })

    return {
        addShow,
        search,
        searchStreamProviders,
        result,
        loading,
        addingShow,
        addedShows,
        providerResults,
        preferredRegions,
    }
}
export default useSearchShowsService
