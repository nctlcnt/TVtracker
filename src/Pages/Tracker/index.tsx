import SearchShows from "@/Pages/Tracker/SearchShows";
import {Link, Navigate} from "react-router-dom";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import React from "react";

export default () => {
    const {tokens} = React.useContext(GlobalContext)
    console.log(tokens)
    const {TMDBToken, airtableToken, airtableBaseId} = tokens
    if (!TMDBToken || !airtableToken || !airtableBaseId) {
        return <Navigate to={'/'}/>
    }

    return (<>
            <Link to={'/'}>Go Back</Link>
            {/*<Button onClick={() => setAppOpen(false)}>back</Button>*/}
            <SearchShows/>
        </>
    )
}