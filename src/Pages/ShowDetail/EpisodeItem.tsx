import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { isBefore } from 'date-fns'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded'
import { APIEpisodeInfoType } from '@/common/types/tmdb'

const EpisodeItem = ({
    episode,
    addedShowIds,
    checkIn,
}: {
    episode: APIEpisodeInfoType
    addedShowIds: number[]
    checkIn: (episode: APIEpisodeInfoType) => void
}) => {
    return (
        <ListItem key={episode.id} disablePadding>
            <ListItemButton role={undefined} onClick={() => checkIn(episode)} dense>
                <ListItemAvatar>
                    <Avatar variant={'square'} src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} />
                </ListItemAvatar>
                <ListItemText
                    id={String(episode.id)}
                    primary={episode.name + ' ' + episode.runtime + 'min'}
                    secondary={episode.air_date + ' ' + episode.overview}
                />
                <ListItemIcon>
                    {addedShowIds.includes(episode.id) ? (
                        <RadioButtonCheckedRoundedIcon color={'success'} />
                    ) : (
                        <RadioButtonUncheckedIcon
                            color={isBefore(new Date(), new Date(episode.air_date)) ? 'disabled' : 'info'}
                        />
                    )}
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}
export default EpisodeItem
