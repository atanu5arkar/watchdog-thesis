import { io } from "socket.io-client";
import os from "node:os";

const nI = os.networkInterfaces();

let macAddress;
let osType = os.type();

const 
    totalMem = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2),
    freeMem = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2),
    usedMem = (totalMem - freeMem).toFixed(2),
    memUsagePer = 100 * usedMem / totalMem;

    upTime = (os.uptime() / (60 * 60)).toFixed(2);

const
    cpuInfo = os.cpus(),
    cores = cpuInfo.length,
    cpuModel = cpuInfo[0].model,
    cpuSpeed = cpuInfo[0].speed;

console.log(cpuInfo);


for(let key in nI){
    if(!nI[key][0].internal){
        macAddress = nI[key][0].mac;
        break;
    }
}

function cpuTotal(){
    let cpu = os.cpus();
    let idleMS = 0;
    let totalMS = 0;
    
    cpu.forEach((ele)=>{
        for(let key in ele.times){
            totalMS += ele.times[key];
        }
        idleMS += ele.times.idle;
    });

    return {
        totalMS : totalMS/cpu.length,
        idleMS : idleMS/cpu.length
    }
};

async function cpuAvg(){
    const start = cpuTotal();
    await setTimeout(100);
    const end = cpuTotal();
    const idleDifference = end.idleMS - start.idleMS;
    const totalDifference = end.totalMS - start.totalMS;
    // console.log(idleDifference, totalDifference);
    const percentageCpu = 100 - Math.floor(100*idleDifference/totalDifference);
    return percentageCpu;
}
// let res = await cpuAvg();

console.log(macAddress);
console.log("Total:", totalMem, "\nFree:", freeMem, "\nUsed:", usedMem);
console.log("Up Time:", upTime);
console.log("CPU Model:", cpuModel, "\nCPU Speed:", cpuSpeed);

// const socket = io("http://5.75.237.233:3000", {
//     auth: {
//         token: "9b40e73b-8613-410d-8c44-0a5201cb4b87"
//     }
// });

// socket.on("connect", () => {
//     console.log("Connected to the Watchdog server.");

//     setInterval(() => {
//         socket.emit("info", cpuInfo);
//     }, 1000);
// });

// socket.on("disconnect", () => {
//     console.log("Disconnected");
    
// });