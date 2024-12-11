import express from 'express';
import Quiz from '../models/Quiz.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('createdBy', 'username');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/', async (req, res) => {
    try {
        const quiz = await Quiz.create({
            ...req.body,
            createdBy: req.user.id
        });
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({message: 'Quiz not found'});
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

export default router;
