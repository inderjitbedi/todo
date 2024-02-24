const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    tttle: {
        type: String,
        default: null
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ["PENDING", "COMPLETED"],
        default: "PENDING"
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const Task = mongoose.model('Task', schema);

module.exports = Task;
