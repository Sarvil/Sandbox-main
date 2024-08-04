const Service = require("../Models/service-model");
const Question = require("../Models/question-model");

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(400).json({ message: "No Service Found" });
            return;
        }
        res.status(200).json({ response });
    } catch (error) {
        next(error);
    }
};

const questions = async (req, res) => {
    try {
        console.log("Done");
        const response = await Question.find();
        if (!response) {
            res.status(400).json({ message: "No Questions Found" });
            return;
        }
        res.status(200).json({ response });
    } catch (error) {
        next(error);
    }
};

module.exports = { services, questions };