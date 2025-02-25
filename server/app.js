import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 3000;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log(socket.id, "is connected.");

    socket.on("vitals", (data) => {
        io.emit("vitals", data);
    });

    socket.on("disconnect", () => {
        console.log(socket.id, "got disconnected.");
    });
});

httpServer.listen(port, () => {
    return console.log("Watchdog server running on", port);
});