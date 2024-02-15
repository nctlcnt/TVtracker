import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import React from "react";

export default () => {
    const {tokens,readCookies} = React.useContext(GlobalContext)
    const {TMDBToken, airtableToken, airtableBaseId} = tokens

    const saveToCookies = (item: string) => {
        // @ts-ignore
        document.cookie = `${item}=${document.getElementById(`${item}`)?.value || ''}`
        console.log('saveToCookies', item)
        readCookies()
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
        <Button className={'mt-3'} onClick={readCookies}>Check Token From Cookies</Button>
        {TMDBToken && airtableToken && airtableBaseId && <div className={'text-left'}>
            <p style={{overflowWrap: 'anywhere'}}><span className={'font-bold'}>TMDBToken:</span> {TMDBToken}</p>
            <p style={{overflowWrap: 'anywhere'}}><span className={'font-bold'}>airtableToken:</span> {airtableToken}
            </p>
            <p style={{overflowWrap: 'anywhere'}}><span className={'font-bold'}>airtableBaseId:</span> {airtableBaseId}
            </p>
            <Link to={'/tracker'}>Go to Tracker</Link>
            <Link to={'/list'}>Go to List</Link>
            {/*<Button onClick={() => setAppOpen(true)}>open</Button>*/}
        </div>}
    </>
}