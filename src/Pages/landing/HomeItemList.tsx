import { Movie } from '@/Pages/landing/useRecommend.ts'
import { Grid, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default ({ items }: { items: Movie[] }) => {
    return (
        <Grid
            direction={'row'}
            container
            wrap={'nowrap'}
            sx={{ overflowX: 'auto', paddingLeft: '17px', ml: '-17px', justifyContent: 'space-between' }}
        >
            {items.slice(0, 4).map((item) => (
                <Grid key={item.id} item xs={2}>
                    <Paper key={item.id} elevation={10}>
                        <img alt={''} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                    </Paper>
                    <Link to={'/show/' + item.id}>
                        <Typography variant={'subtitle2'} lineHeight={1.4} my={1}>
                            {item.title || item.name}
                        </Typography>
                    </Link>
                </Grid>
            ))}
        </Grid>
    )
}
