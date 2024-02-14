import {createContext, Dispatch} from "react";

export type TokensType = {
    TMDBToken: string,
    airtableToken: string,
    airtableBaseId: string
}

export type GlobalContextType = {
    tokens: TokensType,
    setTokens: Dispatch<TokensType>
    readCookies: () => void
}

const MyContext = createContext({} as GlobalContextType)
export default MyContext