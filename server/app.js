import express from "express";
import http from "http";
import { Server } from "socket.io";

import "./connectMongo.js";
import DeviceModel from "./DeviceModel.js";

const app = express();
const port = 3000;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" }
});

const API_KEY = "9b40e73b-8613-410d-8c44-0a5201cb4b87";

function registerDeviceandEmit(socket) {
    socket.on("info", async (data) => {
        try {
            const device = await DeviceModel.findOne({ macAddress: data.macAddress });

            if (!device) await new DeviceModel({ ...data }).save();
            // io.emit("info", data);
            console.log(data)

        } catch (error) {
            console.log(error);
        }
    });

    socket.on("disconnect", () => {
        console.log(socket.id, "got disconnected.");
    });
}

io.on("connection", (socket) => {
    console.log(socket.id, "is connected.");

    if (socket.handshake.auth.token != API_KEY) {
        return socket.disconnect();
    }
    registerDeviceandEmit(socket);
});

httpServer.listen(port, () => {
    return console.log("Watchdog server running on", port);
});