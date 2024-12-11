import express from 'express';
import Score from '../models/Score.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const score = await Score.create({
            ...req.body,
            userId: req.user.id
        });
        res.status(201).json(score);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/user', async (req, res) => {
    try {
        const scores = await Score.find({userId: req.user.id})
            .populate('quizId', 'title')
            .sort('-completedAt');
        res.json(scores);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

export default router;