import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'; // Assurez-vous que le chemin est correct

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extraire le token du header
            token = req.headers.authorization.split(' ')[1];
            // Vérifier le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Récupérer l'utilisateur à partir du token et exclure le mot de passe
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Non autorisé');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Non autorisé, aucun token');
    }
});

export { protect };

