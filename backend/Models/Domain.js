// models/Domain.js
const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const DomainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    records: [RecordSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Domain', DomainSchema);
