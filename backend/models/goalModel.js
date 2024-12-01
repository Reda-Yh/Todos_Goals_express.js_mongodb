import mongoose from 'mongoose';

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,
            required: [true, "Ajouter un texte"],
        },
    },
    {
        timestamps: true,
    }
);

const Goal = mongoose.model('Goal', goalSchema);
export default Goal;
