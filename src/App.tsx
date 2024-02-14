import './App.css'
import SaveInitInformation from "@/Pages/SaveInitInformation";
import {useState} from "react";
import Tracker from "@/Pages/Tracker";
import GlobalContext from "@/globalContext/GlobalContext.ts";
import useGlobalContext from "@/globalContext/useGlobalContext.ts";

function App() {
    const [, setOpen] = useState(false)
    const value = useGlobalContext()
    return (<GlobalContext.Provider value={value}>
            <div >
                <Tracker setAppOpen={setOpen}/>
            </div>
            <div >
                <SaveInitInformation setAppOpen={setOpen}/>
            </div>
        </GlobalContext.Provider>

    )
}

export default App
