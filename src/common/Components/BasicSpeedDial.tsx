import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import { useNavigate } from 'react-router-dom'

export default function BasicSpeedDial() {
    const navigate = useNavigate()
    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy', action: () => navigate('/') },
        { icon: <SaveIcon />, name: 'tracker', action: () => navigate('/tracker') },
        { icon: <PrintIcon />, name: 'list', action: () => navigate('/list') },
        { icon: <ShareIcon />, name: 'history', action: () => navigate('/history') },
    ]

    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.action}
                />
            ))}
        </SpeedDial>
    )
}
