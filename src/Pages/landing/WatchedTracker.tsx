import { Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { formatDate, isWeekend, subDays } from 'date-fns'

export default () => {
    const today = new Date()
    const [week, setWeek] = React.useState<any[]>([])
    useEffect(() => {
        const week = []
        for (let i = 0; i < 7; i++) {
            const date = subDays(today, i)
            const temp = {
                dateDay: formatDate(date, 'dd'),
                day: formatDate(date, 'E'),
                isWeekend: isWeekend(date),
            }
            week.unshift(temp)
        }
        setWeek(week)
    }, [])
    return (
        <Grid container wrap={'nowrap'}>
            {week.map((item) => {
                return (
                    <Grid item xs={2} key={item.dateDay} textAlign={'center'}>
                        <Typography variant={'h6'} color={item.isWeekend ? 'red' : 'inherit'}>
                            {item.day}
                        </Typography>
                        <Typography variant={'subtitle2'} color={item.isWeekend ? 'red' : 'inherit'}>
                            {item.dateDay}
                        </Typography>
                    </Grid>
                )
            })}
        </Grid>
    )
}
