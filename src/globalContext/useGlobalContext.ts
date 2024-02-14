import {useEffect, useState} from "react";
import {TokensType} from "@/globalContext/GlobalContext.ts";
import {Records} from "@/Pages/Tracker";

const useGlobalContext = () => {
    const [tokens, setTokens] = useState<TokensType>({} as TokensType)
    const [showData, setShowData] = useState<Records>([])
    const readCookies = () => {
        console.log('TMDBToken', document.cookie.match(/TMDBToken=([^;]+)/)?.[1])
        const airtableToken = (document.cookie.match(/airtableToken=([^;]+)/)?.[1] || '')
        console.log('airtableToken', document.cookie.match(/airtableToken=([^;]+)/)?.[1])
        const TMDBToken = (document.cookie.match(/TMDBToken=([^;]+)/)?.[1] || '')
        console.log('airtableBaseId', document.cookie.match(/airtableBaseId=([^;]+)/)?.[1])
        const airtableBaseId = (document.cookie.match(/airtableBaseId=([^;]+)/)?.[1] || '')
        setTokens({TMDBToken, airtableToken, airtableBaseId})
    }

    useEffect(() => {
        readCookies()
    }, []);

    return {
        readCookies,
        tokens,
        setTokens,
        showData,
        setShowData
    }
}
export default useGlobalContext