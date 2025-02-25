import { io } from "socket.io-client";

const cpuInfo = {
    macAddress: "23ldfhadjkf23",
    osType: "WSL",
    upTime: "2hr",
    totalMemory: "500GB"
};

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("Connected to the Watchdog server.");

    setInterval(() => {
        socket.emit("vitals", cpuInfo);
    }, 1000);
});