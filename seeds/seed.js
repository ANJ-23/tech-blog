const sequelize = require('../config/connection');
const { Comments, Post, User } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // obtains users & stores them as a variable
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // obtains posts & stores them as a variable
  const post = await Post.bulkCreate(postData, {
    user_id: users[Math.floor(Math.random() * users.length)].id,
  });

  // obtains comments
  const comments = await Comments.bulkCreate(commentData, {
    user_id: users[Math.floor(Math.random() * users.length)].id,
    post_id: post.id,
  });

  process.exit(0);
};

seedDatabase();
