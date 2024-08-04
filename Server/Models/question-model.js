const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
    _id: {
        type: String,
    },
    user: {
        type: Object,
        require: true,
    },
    question: {
        type: String,
        require: true,
    },
    answer: {
        type: String,
        require: true,
    },
    answers: {
        type: [Object],
        require: true,
    },
    timestamp: {
        type: String,
        require: true,
    }
});

const Question = new model("Question", questionSchema);

module.exports = Question;