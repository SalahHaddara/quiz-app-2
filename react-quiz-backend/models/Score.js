import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['multiple-choice', 'text-input']
    },
    question: {
        type: String,
        required: true
    },
    options: [String], // For multiple-choice questions
    correctAnswer: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [questionSchema]
}, {
    timestamps: true
});

export default mongoose.model('Quiz', quizSchema);
