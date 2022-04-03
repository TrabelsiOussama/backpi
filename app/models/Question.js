const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    description: {
        type: String
    },
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: false
    }]
})
const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;