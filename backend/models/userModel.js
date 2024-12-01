import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Ajouter le nom'],
        },
        email: {
            type: String,
            required: [true, 'Ajouter email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Ajouter password'],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
export default User;

