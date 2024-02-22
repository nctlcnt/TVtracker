import { Link } from 'react-router-dom'
import React from 'react'
import SearchShows from '@/Pages/search/SearchShows'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import PaperInput from '@/common/Components/PaperInput.tsx'

function Tracker() {
    const { tokens, setTokens } = React.useContext(GlobalContext)
    const { TMDBToken } = tokens

    return (
        <>
            <Link to="/">Go Back</Link>
            {!TMDBToken && (
                <PaperInput
                    onSubmit={(value) => setTokens({ ...tokens, 'TMDBToken': value as string })}
                    placeholder={'TMDB Token'}
                />
            )}
            {TMDBToken && <SearchShows />}
        </>
    )
}

export default Tracker
