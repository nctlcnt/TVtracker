import './App.css'
import GlobalContext from '@/globalContext/GlobalContext.ts'
import useGlobalContext from '@/globalContext/useGlobalContext.ts'
import Routes from '@/common/Routes.tsx'
import { ThemeProvider } from '@mui/material'
import theme from '@/globalContext/theme.tsx'

function App() {
    const value = useGlobalContext()
    return (
        <ThemeProvider theme={theme}>
            <GlobalContext.Provider value={value}>
                <Routes />
            </GlobalContext.Provider>
        </ThemeProvider>
    )
}

export default App
