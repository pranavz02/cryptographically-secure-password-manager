import mongoose from "mongoose";

const passSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    pass: {type: String, required: true},
    website: {type: String}
    },
    { versionKey: false }
);

const passModel = mongoose.model("passwords", passSchema);

module.exports = passModel;