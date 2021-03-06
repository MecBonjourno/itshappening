const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    insta: {type: String, required: true},
    twitter: {type: String, required: true},
    connections: {type: [String], required: true},
},{
    timestamps: true,
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;