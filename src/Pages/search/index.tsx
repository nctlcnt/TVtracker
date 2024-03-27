import { Box, IconButton, InputBase, Stack, Typography } from '@mui/material'
import useSearchShowsService from '@/Pages/search/useSearchShowsService.ts'
import { useAuthCheck } from '@/common/useAuthCheck.tsx'
import SearchResultItem from '@/Pages/search/SearchResultItem.tsx'
import { APIShowListItemType } from '@/common/types/tmdb'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

export default function () {
    useAuthCheck()
    const { loading, search, result, addShow, addingShow, addedShows } = useSearchShowsService()

    return (
        <div>
            <Box sx={{ display: 'flex', p: 1 }}>
                <IconButton onClick={search}>
                    <SearchRoundedIcon />
                </IconButton>
                <InputBase sx={{ flex: 1 }} id="searchString" placeholder={'search shows'} />
            </Box>
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
