import { Button, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { CheckRounded, ManageSearchRounded } from '@mui/icons-material'
import useSearchShowsService from '@/Pages/search/useSearchShowsService.ts'
import ProviderList from '@/Pages/search/ProviderList.tsx'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'

export default function () {
    useAuthCheck()
    const {
        loading,
        search,
        result,
        addShow,
        searchStreamProviders,
        providerResults,
        addingShow,
        preferredRegions,
        addedShows,
    } = useSearchShowsService()
    return (
        <div>
            <Paper sx={{ display: 'flex', p: 1 }}>
                <InputBase sx={{ flex: 1 }} id="searchString" />
                <Button onClick={search}>Search</Button>
            </Paper>
            {(loading || addingShow) && <p>loading...</p>}
            <List>
                {result.map((item: any) => (
                    <ListItem key={item.id}>
                        <ListItemIcon>
                            <IconButton
                                title={'Add Show'}
                                onClick={() => addShow(item)}
                                disabled={addedShows.includes(item.id)}
                            >
                                {addedShows.includes(item.id) ? <CheckRounded color={'success'} /> : <AddIcon />}
                            </IconButton>
                            <IconButton onClick={() => searchStreamProviders(item.id)} title={'Search Providers'}>
                                <ManageSearchRounded />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText primary={item.name} secondary={item.overview} />
                    </ListItem>
                ))}
            </List>
            <ProviderList preferredRegions={preferredRegions} providers={providerResults} />
        </div>
    )
}
