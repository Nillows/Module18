// Import required modules
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const db = require('../config/connection'); // Use the existing connection setup
const { User, Thought } = require('../models'); // Update this path if necessary

// Seed data function
async function johnnyApple() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Beatles members just because
    const beatlesMembers = [
      { username: 'John Lennon', email: 'john@beatles.com' },
      { username: 'Paul McCartney', email: 'paul@beatles.com' },
      { username: 'George Harrison', email: 'george@beatles.com' },
      { username: 'Ringo Starr', email: 'ringo@beatles.com' }
    ];

    const users = await User.insertMany(beatlesMembers);

    // Thoughts for each Beatles member
    const thoughtsData = [
      { thoughtText: "Life is what happens when you're busy making other plans.", username: 'John Lennon' },
      { thoughtText: "All you need is love.", username: 'John Lennon' },
      { thoughtText: "I get by with a little help from my friends.", username: 'Paul McCartney' },
      { thoughtText: "Yesterday, all my troubles seemed so far away.", username: 'Paul McCartney' },
      { thoughtText: "While my guitar gently weeps.", username: 'George Harrison' },
      { thoughtText: "It's all in the mind.", username: 'George Harrison' },
      { thoughtText: "You got to pay your dues if you wanna sing the blues.", username: 'Ringo Starr' },
      { thoughtText: "Peace and love, peace and love.", username: 'Ringo Starr' }
    ];

    const thoughts = await Thought.insertMany(thoughtsData.map(thought => ({
      ...thought,
      createdAt: dayjs().toDate()
    })));

    // Associate thoughts with their respective users
    for (let i = 0; i < users.length; i++) {
      const userThoughts = thoughts.filter(thought => thought.username === users[i].username);
      await User.findByIdAndUpdate(users[i]._id, { $push: { thoughts: { $each: userThoughts.map(thought => thought._id) } } });
    }

    console.log('Seed data successfully inserted');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// Use the existing connection to perform seeding once it's open
db.once('open', () => {
  johnnyApple();
});
