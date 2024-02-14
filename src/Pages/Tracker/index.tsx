import SearchShows from "@/Pages/Tracker/SearchShows";

export default ({setAppOpen}: { setAppOpen: any }) => {
    return (<>
            <button onClick={() => setAppOpen(false)}>back</button>
            <SearchShows/>
        </>
    )
}