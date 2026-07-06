import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: Number,
    fitnessGoal: String,
    city: String,
    createdAt: { type: Date, default: Date.now },
});
export const User = model('User', userSchema);
