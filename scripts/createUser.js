const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const users = [
  {
    name: 'admin One',
    username: 'admin1',
    email: 'admin1@example.com',
    password: 'AdminPass1',
    role: 'admin',
  },
  {
    name: 'admin Two',
    username: 'admin2',
    email: 'admin2@example.com',
    password: 'AdminPass2',
    role: 'admin',
  },
  {
    name: ' User One',
    username: 'User1',
    email: 'user1@example.com',
    password: 'UserPass1',
    role: 'user',
  },
  {
    name: 'User Two',
    username: 'User2',
    email: 'user2@example.com',
    password: 'UserPass2',
    role: 'user',
  },
];

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected successfully');

    await User.deleteMany(); // Optional: Clear existing users

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const createdUser = await User.create({ ...user, password: hashedPassword });
      console.log(`Created ${createdUser.role}: ${createdUser.username}`);
    }

    console.log('All users created');
    process.exit(0);
  } catch (error) {
    console.error('Error creating users:', error.message);
    process.exit(1);
  }
};

createUsers();