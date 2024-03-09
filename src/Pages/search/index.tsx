import { Box, Button, InputBase, Paper, Stack, Typography } from '@mui/material'
import useSearchShowsService from '@/Pages/search/useSearchShowsService.ts'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'
import SearchResultItem from '@/Pages/search/SearchResultItem.tsx'
import { APIShowListItemType } from '@/common/types/tmdb'

export default function () {
    useAuthCheck()
    const { loading, search, result, addShow, addingShow, addedShows } = useSearchShowsService()

    return (
        <div>
            <Paper sx={{ display: 'flex', p: 1 }}>
                <InputBase sx={{ flex: 1 }} id="searchString" />
                <Button onClick={search}>Search</Button>
            </Paper>
            {(loading || addingShow) && <p>loading...</p>}
            <Stack>
                <Typography>Results</Typography>
                {result.map((item: APIShowListItemType) => (
                    <Box
                        sx={{
                            '&:hover': {
                                '.search-result-item': {
                                    opacity: 1,
                                },
                            },
                        }}
                    >
                        <SearchResultItem resultItem={item} key={item.id} addedShows={addedShows} addShow={addShow} />
                    </Box>
                ))}
            </Stack>
        </div>
    )
}
