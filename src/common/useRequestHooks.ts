import { getRecordsUrl } from '@/common/apis.ts'
import axios from 'axios'
import { useRequest } from 'ahooks'
import React, { useEffect } from 'react'
import { TokensType } from '@/common/types'

const useRequestHooks = ({ requestAirtableCb }: { requestAirtableCb?: Function }) => {
    const [tokens, setTokens] = React.useState({} as TokensType)
    const readCookies = () => {
        console.log('readCookies', document.cookie)
        const airtableToken = document.cookie.match(/airtableToken=([^;]+)/)?.[1] || ''
        const TMDBToken = document.cookie.match(/TMDBToken=([^;]+)/)?.[1] || ''
        const airtableBaseId = document.cookie.match(/airtableBaseId=([^;]+)/)?.[1] || ''
        setTokens({ TMDBToken, airtableToken, airtableBaseId })
    }
    const airtableToken = tokens?.airtableToken
    const airtableBaseId = tokens?.airtableBaseId

    useEffect(() => {
        if (!airtableToken || !airtableBaseId) {
            readCookies()
        }
    }, [])

    const requestTvRecords = async (databaseName: string, otherParams?: any) => {
        const requestUrl = getRecordsUrl.replace('{baseId}', airtableBaseId).replace('{tableIdOrName}', databaseName)
        return axios.get(requestUrl, {
            params: { view: 'All', ...otherParams },
            headers: {
                Authorization: `Bearer ${airtableToken}`,
            },
        })
    }

    const { run: getAirtableRecords, loading: gettingAirtableRecords } = useRequest(requestTvRecords, {
        manual: true,
        onSuccess: (data) => {
            requestAirtableCb && requestAirtableCb(data)
        },
    })

    return {
        getAirtableRecords: airtableToken || airtableBaseId ? getAirtableRecords : () => {},
        gettingAirtableRecords,
    }
}

export default useRequestHooks
