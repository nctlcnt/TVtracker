import {useEffect, useState} from "react";

export default ({setAppOpen}: { setAppOpen: any }) => {
    const [TMDBToken, setTMDBToken] = useState('')
    const [airtableToken, setAirtableToken] = useState('')
    const [airtableBaseId, setAirtableBaseId] = useState('')
    const checkTokenFromCookies = () => {
        console.log('checkTokenFromCookies')
        console.log('TMDBToken', document.cookie.match(/TMDBToken=([^;]+)/)?.[1])
        setAirtableToken(document.cookie.match(/airtableToken=([^;]+)/)?.[1] || '')
        console.log('airtableToken', document.cookie.match(/airtableToken=([^;]+)/)?.[1])
        setTMDBToken(document.cookie.match(/TMDBToken=([^;]+)/)?.[1] || '')
        console.log('airtableBaseId', document.cookie.match(/airtableBaseId=([^;]+)/)?.[1])
        setAirtableBaseId(document.cookie.match(/airtableBaseId=([^;]+)/)?.[1] || '')
    }
    const saveToCookies = (item: string) => {
        // @ts-ignore
        document.cookie = `${item}=${document.getElementById(`${item}`)?.value || ''}`
        console.log('saveToCookies', item)
    }

    useEffect(() => {
        checkTokenFromCookies()

    }, [])

    return <>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci assumenda blanditiis corporis
            dicta dignissimos eligendi eveniet impedit, in ipsum iste laboriosam mollitia odio placeat porro quisquam,
            quo,
            recusandae sequi!</p>
        <div className='flex flex-col'>
            <label htmlFor='TMDBToken'>saveTMDBTokenToCookies</label>
            <div>
                <input className='border-2' id='TMDBToken'/>
                <button className={'ml-3'} onClick={() => saveToCookies('TMDBToken')}>Save TMDB Token</button>
            </div>
        </div>
        <div className='flex flex-col'>
            <label htmlFor='airtableToken'>airtableToken</label>
            <div>
                <input className='border-2' id='airtableToken'/>
                <button className={'ml-3'} onClick={() => saveToCookies('airtableToken')}>Save Airtable Token
                </button>
            </div>
        </div>
        <div className='flex flex-col'>
            <label htmlFor='airtableBaseId'>airtableBaseId</label>
            <div>
                <input className='border-2' id='airtableBaseId'/>
                <button className={'ml-3'} onClick={() => saveToCookies('airtableBaseId')}>Save Airtable Token
                </button>
            </div>
        </div>
        <button className={'mt-3'} onClick={checkTokenFromCookies}>Check Token From Cookies</button>
        {TMDBToken && airtableToken &&airtableBaseId && <div className={'text-left'}>
            <p style={{overflowWrap: 'anywhere'}}><span className={'font-bold'}>TMDBToken:</span> {TMDBToken}</p>
            <p style={{overflowWrap: 'anywhere'}}><span className={'font-bold'}>airtableToken:</span> {airtableToken}</p>
            <p style={{overflowWrap: 'anywhere'}}><span className={'font-bold'}>airtableBaseId:</span> {airtableBaseId}</p>
            <button onClick={() => setAppOpen(true)}>open</button>
        </div>}
    </>
}