import { IconButton, InputBase, Paper } from '@mui/material'
import { ArrowRightRounded } from '@mui/icons-material'
import { useState } from 'react'

const paperInput = ({
    placeholder,
    onSubmit,
    clearAfterSubmit = true,
}: {
    placeholder?: string
    onSubmit?: (value: unknown) => void
    clearAfterSubmit?: boolean
}) => {
    const [value, setValue] = useState<unknown>('')
    const submitValue = () => {
        onSubmit?.(value)
        if (clearAfterSubmit) {
            setValue('')
        }
    }
    const handleKeyUp = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            submitValue()
        }
    }
    return (
        <Paper
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                mb: 2,
            }}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                }}
                autoFocus={true}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder || 'input value here'}
                onKeyUp={handleKeyUp}
            />
            <IconButton onClick={submitValue}>
                <ArrowRightRounded />
            </IconButton>
        </Paper>
    )
}
export default paperInput
