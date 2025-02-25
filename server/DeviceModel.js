import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    macAddress: {
        type: String,
        required: true,
    },
    osType: {
        type: String,
        required: true,
    },
    upTime: {
        type: String,
        required: true,
    },
    totalMemory: {
        type: String,
        required: true,
    },
});

const DeviceModel = mongoose.model("Devices", deviceSchema);

export default DeviceModel;
