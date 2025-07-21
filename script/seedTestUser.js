const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

function generateUsers(role, count) {
  const users = [];

  for (let i = 1; i <= count; i++) {
    const username = role + i;
    const email = username + '@test.com';
    const password = username + 'Pass';
    const name = role.charAt(0).toUpperCase() + role.slice(1) + ' ' + i;

    // Admins use role=admin, others use role=user
    const roleValue = role === 'admin' ? 'admin' : 'user';

    // Mentors and mentees get userType, admins get null
    const userType = (role === 'mentor' || role === 'mentee') ? role : null;

    users.push({
      name: name,
      username: username,
      email: email,
      password: password,
      role: roleValue,
      userType: userType
    });
  }

  return users;
}

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');

    await User.deleteMany();

    const mentors = generateUsers('mentor', 10);
    const mentees = generateUsers('mentee', 10);
    const admins = generateUsers('admin', 2);

    const allUsers = mentors.concat(mentees).concat(admins);

    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      const hashed = await bcrypt.hash(user.password, 10);
      user.password = hashed;

      const savedUser = await User.create(user);
      console.log('Created ' + (savedUser.userType || savedUser.role) + ': ' + savedUser.username);
    }

    console.log('All test users created');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
}

seedUsers();