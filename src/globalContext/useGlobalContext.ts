import { useEffect, useState } from 'react'
import { TokensType } from '@/common/types/types'
import useInit from '@/globalContext/useInit.ts'
import { HistoryItemRecord, ShowListItemRecord } from '@/common/types/mongo'

export const getTokensFromCookies = (): TokensType => {
    const TMDBToken = document.cookie.match(/TMDBToken=([^;]+)/)?.[1] || ''
    return { TMDBToken }
}

const useGlobalContext = () => {
    const initData = useInit()
    const [tokens, setTokens] = useState<TokensType>({} as TokensType)
    const [showData, setShowData] = useState<ShowListItemRecord[]>([])
    const [historyData, setHistoryData] = useState<HistoryItemRecord[]>([])
    const readCookies = () => {
        setTokens(getTokensFromCookies())
    }

    useEffect(() => {
        readCookies()
    }, [])

    return {
        readCookies,
        tokens,
        setTokens,
        showData,
        setShowData,
        historyData,
        setHistoryData,
        ...initData,
    }
}
export default useGlobalContext
