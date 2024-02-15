import {Dispatch} from "react";

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
}