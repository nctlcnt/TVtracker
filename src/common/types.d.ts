import {Dispatch} from "react";
import {HistoryItemType, Records} from "@/common/airtableTypes";

export type TokensType = {
    TMDBToken: string,
    airtableToken: string,
    airtableBaseId: string
}

export type GlobalContextType = {
    tokens: TokensType,
    setTokens: Dispatch<TokensType>,
    readCookies: () => void,
    showData: Records,
    setShowData: Dispatch<Records>
    historyData: HistoryItemType[],
    setHistoryData: Dispatch<HistoryItemType[]>
}