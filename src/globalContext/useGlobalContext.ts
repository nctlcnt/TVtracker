import {useState} from 'react';
import {TokensType} from '@/common/types';
import {HistoryItemType, Records} from '@/common/airtableTypes';

const useGlobalContext = () => {
    const [tokens, setTokens] = useState<TokensType>({} as TokensType);
    const [showData, setShowData] = useState<Records>([]);
    const [historyData, setHistoryData] = useState<HistoryItemType[]>([]);
    const readCookies = () => {
        console.log('readCookies', document.cookie);
        const airtableToken = (document.cookie.match(/airtableToken=([^;]+)/)?.[1] || '');
        const TMDBToken = (document.cookie.match(/TMDBToken=([^;]+)/)?.[1] || '');
        const airtableBaseId = (document.cookie.match(/airtableBaseId=([^;]+)/)?.[1] || '');
        setTokens({TMDBToken, airtableToken, airtableBaseId});
    };

    // useEffect(() => {
    //     readCookies()
    //     console.log('useGlobalContext', tokens)
    // }, []);

    return {
        readCookies,
        tokens,
        setTokens,
        showData,
        setShowData,
        historyData, setHistoryData
    };
};
export default useGlobalContext;
