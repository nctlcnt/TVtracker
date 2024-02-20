import { Dispatch } from 'react'
import { HistoryItemType, Records } from '@/common/airtableTypes'

export type TokensType = {
    TMDBToken: string
    airtableToken: string
    airtableBaseId: string
}

export type GlobalContextType = {
    tokens: TokensType
    setTokens: Dispatch<TokensType>
    readCookies: () => void
    showData: Records
    setShowData: Dispatch<Records>
    historyData: HistoryItemType[]
    setHistoryData: Dispatch<HistoryItemType[]>
    settings: SettingsType
    gettingSettings: boolean
}

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
