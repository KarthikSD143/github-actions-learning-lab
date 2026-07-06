import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focus: String,
    equipment: [String],
    createdAt: { type: Date, default: Date.now },
});
export const Workout = model('Workout', workoutSchema);
