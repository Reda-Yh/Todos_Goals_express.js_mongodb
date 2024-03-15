import asyncHandler from 'express-async-handler';
import Goal from '../models/goalModel.js';
import User from '../models/userModel.js';

// Récupération des objectifs
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

// Création d'un objectif
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Ajouter un objectif');
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });
    res.status(200).json(goal);
});

// Mise à jour d'un objectif
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('Objectif non trouvé');
    }
    if (!req.user) {
        res.status(401)
        throw new Error('User not trouvé');
    }
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User non autorisé')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedGoal);
});

// Suppression d'un objectif
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('Objectif non trouvé');
    }
    if (!req.user) {
        res.status(401)
        throw new Error('User not trouvé');
    }
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User non autorisé')
    }
    await goal.deleteOne();

    res.status(200).json({ id: req.params.id });
});

export { getGoals, setGoal, updateGoal, deleteGoal };
