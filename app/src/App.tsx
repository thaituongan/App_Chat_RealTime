import { useState } from "react";
import "./App.css";
import LoginComponent from "./components/LoginComponent";

function App() {
    return (
        <div className="App">
            <LoginComponent/>
            {/*{!showChat && <Login callback={getName} />}*/}
            {/*{showChat && <Chat name = {name} />}*/}
        </div>
    );
}
export default App;
