const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema({
    task: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
