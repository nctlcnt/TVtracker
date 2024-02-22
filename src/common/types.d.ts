import { Dispatch } from 'react'
import { InitDataType } from '@/globalContext/useInit.ts'
import { ShowType } from '@/Pages/search/SearchShows/useSearchShowsService.ts'
import { HistoryItemProps } from '@/Pages/HistoryList'

export type TokensType = {
    TMDBToken: string
    airtableToken: string
    airtableBaseId: string
}

export type GlobalContextType = {
    tokens: TokensType
    setTokens: Dispatch<TokensType>
    readCookies: () => void
    showData: ShowType[]
    setShowData: Dispatch<ShowType[]>
    historyData: HistoryItemProps[]
    setHistoryData: Dispatch<HistoryItemProps[]>
    settings: SettingsType
    gettingSettings: boolean
} & InitDataType

export type SelectionRecords = {
    id: string
    createdTime: string
    fields: { Name: string; Notes: string }
}[]
export type SettingsType = { preferredProviders: string[] }

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
