import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        name: 'Alex Rivera',
        email: 'alex@example.com',
        password: 'password123',
        age: 29,
        fitnessGoal: 'Build endurance',
        city: 'Seattle',
      },
      {
        name: 'Maya Chen',
        email: 'maya@example.com',
        password: 'password123',
        age: 31,
        fitnessGoal: 'Lose weight',
        city: 'Austin',
      },
    ]);

    await Team.insertMany([
      {
        name: 'North Stars',
        sport: 'Running',
        captain: users[0].name,
        members: users.map((user) => user.name),
      },
      {
        name: 'Peak Performers',
        sport: 'Cycling',
        captain: users[1].name,
        members: [users[1].name],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Run',
        durationMinutes: 35,
        distanceKm: 5.2,
        caloriesBurned: 420,
      },
      {
        userId: users[1]._id.toString(),
        type: 'Cycling',
        durationMinutes: 45,
        distanceKm: 18.5,
        caloriesBurned: 610,
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: users[0]._id.toString(),
        name: users[0].name,
        points: 1250,
        rank: 1,
      },
      {
        userId: users[1]._id.toString(),
        name: users[1].name,
        points: 1080,
        rank: 2,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Circuit',
        durationMinutes: 25,
        difficulty: 'Intermediate',
        focus: 'Cardio',
        equipment: ['mat', 'jump rope'],
      },
      {
        name: 'Strength Builder',
        durationMinutes: 40,
        difficulty: 'Advanced',
        focus: 'Strength',
        equipment: ['dumbbells'],
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
