import { createTheme } from '@mui/material'

const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.variant === 'h1' && {
                        fontFamily: 'Linden Hill',
                    }),
                    ...(ownerState.variant === 'h4' && {
                        fontFamily: 'Linden Hill',
                    }),
                    ...(ownerState.variant === 'h5' && {
                        fontFamily: 'Linden Hill',
                    }),
                    ...(ownerState.variant === 'h6' && {
                        fontFamily: 'Linden Hill',
                    }),
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.color === 'primary' &&
                        ownerState.variant === 'contained' && {
                            backgroundColor: '#ffffff',
                        }),
                    ...(ownerState.color === 'primary' &&
                        ownerState.variant === 'text' && {
                            color: 'black',
                        }),
                }),
            },
        },
        MuiFab: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.color === 'primary' && {
                        color: 'beige',
                        backgroundColor: 'black',
                        '&:hover': {
                            backgroundColor: 'black',
                        },
                    }),
                }),
            },
        },
    },
})

export default theme
