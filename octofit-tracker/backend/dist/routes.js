import { Router } from 'express';
import { User } from './models/user.js';
import { Team } from './models/team.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Workout } from './models/workout.js';
const router = Router();
async function getCollectionItems(model) {
    return model.find({}).lean();
}
router.get('/api/users', async (_req, res) => {
    const users = await getCollectionItems(User);
    res.json(users);
});
router.get('/api/users/', async (_req, res) => {
    const users = await getCollectionItems(User);
    res.json(users);
});
router.get('/api/teams', async (_req, res) => {
    const teams = await getCollectionItems(Team);
    res.json(teams);
});
router.get('/api/teams/', async (_req, res) => {
    const teams = await getCollectionItems(Team);
    res.json(teams);
});
router.get('/api/activities', async (_req, res) => {
    const activities = await getCollectionItems(Activity);
    res.json(activities);
});
router.get('/api/activities/', async (_req, res) => {
    const activities = await getCollectionItems(Activity);
    res.json(activities);
});
router.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await getCollectionItems(Leaderboard);
    res.json(leaderboard);
});
router.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await getCollectionItems(Leaderboard);
    res.json(leaderboard);
});
router.get('/api/workouts', async (_req, res) => {
    const workouts = await getCollectionItems(Workout);
    res.json(workouts);
});
router.get('/api/workouts/', async (_req, res) => {
    const workouts = await getCollectionItems(Workout);
    res.json(workouts);
});
export default router;
