import useGlobalContext from "@/globalContext/useGlobalContext.ts";
import {Button} from "@mui/material";

export default ({setAppOpen}: { setAppOpen: any }) => {
    const {tokens, setTokens} = useGlobalContext()
    const {TMDBToken, airtableToken, airtableBaseId} = tokens
    const checkTokenFromCookies = () => {
        const airtableToken = (document.cookie.match(/airtableToken=([^;]+)/)?.[1] || '')
        const TMDBToken = (document.cookie.match(/TMDBToken=([^;]+)/)?.[1] || '')
        const airtableBaseId = (document.cookie.match(/airtableBaseId=([^;]+)/)?.[1] || '')
        setTokens({TMDBToken, airtableToken, airtableBaseId})
    }
    const saveToCookies = (item: string) => {
        // @ts-ignore
        document.cookie = `${item}=${document.getElementById(`${item}`)?.value || ''}`
        console.log('saveToCookies', item)
        checkTokenFromCookies()
    }

    return <>
        <div className='flex flex-col'>
            <label htmlFor='TMDBToken'>saveTMDBTokenToCookies</label>
            <div>
                <input className='border-2' id='TMDBToken'/>
                <Button className={'ml-3'} onClick={() => saveToCookies('TMDBToken')}>Save TMDB Token</Button>
            </div>
        </div>
        <div className='flex flex-col'>
            <label htmlFor='airtableToken'>airtableToken</label>
            <div>
                <input className='border-2' id='airtableToken'/>
                <Button className={'ml-3'} onClick={() => saveToCookies('airtableToken')}>Save Airtable Token
                </Button>
            </div>
        </div>
        <div className='flex flex-col'>
            <label htmlFor='airtableBaseId'>airtableBaseId</label>
            <div>
                <input className='border-2' id='airtableBaseId'/>
                <Button className={'ml-3'} onClick={() => saveToCookies('airtableBaseId')}>Save Airtable Token
                </Button>
            </div>
        </div>
        <Button className={'mt-3'} onClick={checkTokenFromCookies}>Check Token From Cookies</Button>
        {TMDBToken && airtableToken && airtableBaseId && <div className={'text-left'}>
            <p style={{overflowWrap: 'anywhere'}}><span className={'font-bold'}>TMDBToken:</span> {TMDBToken}</p>
            <p style={{overflowWrap: 'anywhere'}}><span className={'font-bold'}>airtableToken:</span> {airtableToken}
            </p>
            <p style={{overflowWrap: 'anywhere'}}><span className={'font-bold'}>airtableBaseId:</span> {airtableBaseId}
            </p>
            <Button onClick={() => setAppOpen(true)}>open</Button>
        </div>}
    </>
}