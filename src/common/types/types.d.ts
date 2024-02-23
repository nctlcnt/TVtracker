import { Dispatch } from 'react'
import { InitDataType } from '@/globalContext/useInit.ts'
import { ShowType } from '@/Pages/search/useSearchShowsService.ts'
import { HistoryItemRecord, ShowListItemRecord } from '@/common/types/mongo'

export type TokensType = {
    TMDBToken: string
}

export type GlobalContextType = {
    tokens: TokensType
    setTokens: Dispatch<TokensType>
    readCookies: () => void
    showData: ShowListItemRecord[]
    setShowData: Dispatch<ShowType[]>
    historyData: HistoryItemRecord[]
    setHistoryData: Dispatch<HistoryItemRecord[]>
} & InitDataType

export type ProviderRecords = {
    [key: string]: {
        link: string
        flatrate: {
            display_priority: number
            logo_path: string
            provider_id: number
            provider_name: string
        }[]
        ads: {
            display_priority: number
            logo_path: string
            provider_id: number
            provider_name: string
        }[]
    }
}
