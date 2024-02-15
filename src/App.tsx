import './App.css'
import GlobalContext from "@/globalContext/GlobalContext.ts";
import useGlobalContext from "@/globalContext/useGlobalContext.ts";
import Routes from "@/common/Routes.tsx";


function App() {
    const value = useGlobalContext()
    return <GlobalContext.Provider value={value}>
        <Routes/>
    </GlobalContext.Provider>
}

export default App
