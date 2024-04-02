import { Box, IconButton, InputBase } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useSearchShowsService from '@/Pages/search/useSearchShowsService.ts'

export default () => {
    const { search } = useSearchShowsService()

    return (
        <Box sx={{ display: 'flex' }} mt={4} pb={3} mb={3}>
            <IconButton onClick={search}>
                <SearchRoundedIcon />
            </IconButton>
            <InputBase sx={{ flex: 1 }} id="searchString" placeholder={'Where will your adventure begin?'} />
        </Box>
    )
}
