import { io } from "socket.io-client";

const cpuInfo = {
    macAddress: "FA:16:3E:12:34:56",
    osType: "MAC",
    upTime: "2hr",
    totalMemory: "500GB"
};

const socket = io("http://5.75.237.233:3000", {
    auth: {
        token: "9b40e73b-8613-410d-8c44-0a5201cb4b87"
    }
});

socket.on("connect", () => {
    console.log("Connected to the Watchdog server.");

    setInterval(() => {
        socket.emit("info", cpuInfo);
    }, 1000);
});

socket.on("disconnect", () => {
    console.log("Disconnected");
    
});