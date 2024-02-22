import { useEffect, useState } from 'react'
import { TokensType } from '@/common/types'
import useInit from '@/globalContext/useInit.ts'
import { ShowType } from '@/Pages/search/SearchShows/useSearchShowsService.ts'
import { HistoryItemProps } from '@/Pages/HistoryList'

export const getTokensFromCookies = () => {
    const TMDBToken = document.cookie.match(/TMDBToken=([^;]+)/)?.[1] || ''
    return { TMDBToken }
}

const useGlobalContext = () => {
    const initData = useInit()
    const [tokens, setTokens] = useState<TokensType>({} as TokensType)
    const [showData, setShowData] = useState<ShowType[]>([])
    const [historyData, setHistoryData] = useState<HistoryItemProps[]>([])
    const readCookies = () => {
        console.log('readCookies', document.cookie)
        setTokens(getTokensFromCookies() as TokensType)
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
