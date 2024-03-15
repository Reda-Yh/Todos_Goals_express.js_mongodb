import express from 'express';
import { getGoals, setGoal, updateGoal, deleteGoal } from '../controllers/goalController.js';
import { protect } from '../middleware/authMiddleware.js'; // Assurez-vous que le chemin est correct

const router = express.Router();

router.route('/').get(protect,getGoals).post(protect,setGoal);
router.route('/:id').delete(protect,deleteGoal).put(protect,updateGoal);

export default router;
