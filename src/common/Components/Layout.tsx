import BasicSpeedDial from '@/common/Components/BasicSpeedDial.tsx'
import { Box } from '@mui/material'

export default ({ children }: { children: any }) => {
    return (
        <Box>
            {children}
            <BasicSpeedDial />
        </Box>
    )
}
