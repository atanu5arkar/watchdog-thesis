import { io } from 'socket.io-client';
import { useEffect } from 'react';

import './App.css';

function App() {

    useEffect(() => {
        var socket = io("http://localhost:3000");

        socket.on("connect", () => {
            console.log("Dashboard is connected to the Watchdog server.");
        });

        socket.on("vitals", (data) => {
            console.log("New vitals", data);
        });

     }, []);

    return <></>
}

export default App;
