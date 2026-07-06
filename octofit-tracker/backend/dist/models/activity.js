import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: Number,
    caloriesBurned: Number,
    date: { type: Date, default: Date.now },
});
export const Activity = model('Activity', activitySchema);
