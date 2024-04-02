import React, { useEffect } from 'react'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import axios from 'axios'
import { dbHistoryRequest, deleteHistoryEntry } from '@/apis/mongodbAPI.ts'
import { useRequest } from 'ahooks'
import { HistoryItemRecord } from '@/common/types/mongo'

const useHistory = () => {
    const { historyData, setHistoryData } = React.useContext(GlobalContext)

    const requestProgressData = () => axios.get(dbHistoryRequest)
    const { run: getProgress, loading: gettingProgress } = useRequest(requestProgressData, {
        manual: true,
        onSuccess: ({ data }) => {
            console.log('getProgress', data)
            setHistoryData(data as HistoryItemRecord[])
        },
    })
    useEffect(() => {
        refresh()
    }, [])

    const refresh = () => {
        getProgress()
    }
    const randomHexColorCode = (seed: number) => {
        let randomNumber = seed ? Number('0.' + seed.toString()) : Math.random()
        let n = (randomNumber * 0xfffff * 1000000).toString(16)
        // console.log(n)
        return '#' + n.slice(2, 8)
    }

    const deleteRecordRequest = async (recordId: string) => axios.delete(deleteHistoryEntry.replace('{_id}', recordId))

    const { run: deleteRecord } = useRequest(deleteRecordRequest, {
        manual: true,
        onSuccess: (data) => {
            console.log('deleteRecord', data)
            refresh()
        },
    })
    return { gettingProgress, deleteRecord, historyData, randomHexColorCode, refresh }
}
export default useHistory
