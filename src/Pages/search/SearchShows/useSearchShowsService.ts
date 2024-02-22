import axios from 'axios'
import { useRequest } from 'ahooks'
import React, { useState } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { ShowDetailType, TMDBResults } from '@/common/tmdbTypes'
import { ProviderRecords } from '@/common/types'
import { searchProviders, searchTvShows } from '@/apis/tmdbAPI.ts'
import { getShows } from '@/apis/mongodbAPI.ts'

export type RequestShowType = {
    showId: number
    status: string
    showTitle: string
    availableAt: string[]
    watchingAt: string[]
    posterPath: string
    firstAired: string
    originalTitle: string
    createdBy: string
    created: string
}

export type ShowType = RequestShowType & {
    _id: string
}

const useSearchShowsService = () => {
    const [result, setResult] = useState<TMDBResults>([] as TMDBResults)
    const {
        tokens,
        userSettings: { preferredRegions },
        userId,
    } = React.useContext(GlobalContext)
    const { TMDBToken } = tokens
    const [addedShows, setAddedShows] = useState<number[]>([] as number[])

    const [providerResults, setProviderResults] = useState<ProviderRecords>([] as any)
    const requestSearchShows = (queryString: string) =>
        axios.get(searchTvShows, {
            params: {
                query: queryString,
                language: 'zh-CN',
            },
            headers: {
                Authorization: `Bearer ${TMDBToken}`,
            },
        })
    const { run: searchTvShow, loading } = useRequest(requestSearchShows, {
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

    const requestShowList = () =>
        axios.get(getShows, {
            params: {
                createdBy: userId,
            },
        })

    const { run: getShowList } = useRequest(requestShowList, {
        manual: true,
        onSuccess: ({ data }) => {
            console.log('getShowList', data)
            setAddedShows(data.map((item: ShowType) => item.showId))
        },
    })

    const postShow = (item: ShowDetailType) =>
        axios.post(getShows, {
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
        } as RequestShowType)

    const { run: addShow, loading: addingShow } = useRequest(postShow, {
        manual: true,
        onSuccess: (data) => {
            console.log('addShow success', data)
            if (data.status === 200) {
                getShowList()
            }
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
