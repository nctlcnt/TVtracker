import { useEffect, useState } from 'react'
import { SelectionRecords, SettingsType, TokensType } from '@/common/types'
import { HistoryItemType, Records } from '@/common/airtableTypes'
import useRequestHooks, { getTokensFromCookies } from '@/common/useRequestHooks.ts'

const useGlobalContext = () => {
    const [tokens, setTokens] = useState<TokensType>({} as TokensType)
    const [showData, setShowData] = useState<Records>([])
    const [historyData, setHistoryData] = useState<HistoryItemType[]>([])
    const readCookies = () => {
        console.log('readCookies', document.cookie)
        setTokens(getTokensFromCookies() as TokensType)
    }

    const [settings, setSettings] = useState<SettingsType>({} as SettingsType)
    const { gettingAirtableRecords: gettingSettings, getAirtableRecords: getSelectionRecords } = useRequestHooks({
        requestAirtableCb: (data: any) => {
            setSettings(processRecordsToSettings(data.data.records))
        },
    })

    const processRecordsToSettings = (records: SelectionRecords) => {
        const settings: { [key: string]: string[] } = {}
        records.map((record) => {
            if (record.fields.Name) {
                settings[record.fields.Name] = record.fields.Notes.split(',').map((item) => item.trim())
            }
        })
        return settings as SettingsType
    }

    useEffect(() => {
        readCookies()
        getSelectionRecords('selections')
        // console.log('useGlobalContext', tokens)
    }, [])

    return {
        readCookies,
        tokens,
        setTokens,
        showData,
        setShowData,
        historyData,
        setHistoryData,
        settings,
        gettingSettings,
    }
}
export default useGlobalContext
