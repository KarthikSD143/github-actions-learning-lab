import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  points: { type: Number, required: true },
  rank: Number,
  updatedAt: { type: Date, default: Date.now },
});

export const Leaderboard = model('Leaderboard', leaderboardSchema);
