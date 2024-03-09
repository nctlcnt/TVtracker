import { useRequest } from 'ahooks'
import React, { useState } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import { ProviderRecords } from '@/common/types/types'
import { searchProviders } from '@/apis/tmdbAPI.ts'
import useAxios from '@/common/tmdbRequest.ts'

const useSearchShowsService = () => {
    const {
        tokens,
        userSettings: { preferredRegions },
    } = React.useContext(GlobalContext)
    const { TMDBToken } = tokens
    const axios = useAxios()

    const [providerResults, setProviderResults] = useState<ProviderRecords>([] as any)

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

    return {
        searchStreamProviders,
        providerResults,
        preferredRegions,
    }
}
export default useSearchShowsService
