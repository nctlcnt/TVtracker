import './App.css'
import SaveInitInformation from "@/Pages/SaveInitInformation";
import {useState} from "react";
import Tracker from "@/Pages/Tracker";

function App() {
    const [open, setOpen] = useState(false)
    return (
        <>
            {
                open && <div>
                    <Tracker setAppOpen={setOpen}/>
                </div>
            }
            {
                !open &&
                <SaveInitInformation setAppOpen={setOpen}/>
            }
        </>
    )
}

export default App
