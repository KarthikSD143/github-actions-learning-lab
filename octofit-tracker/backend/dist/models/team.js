import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    captain: { type: String, required: true },
    members: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});
export const Team = model('Team', teamSchema);
