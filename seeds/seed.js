const sequelize = require('../config/connection');
const { Comments, Post, User } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // await User.bulkCreate(userData);

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  /* for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  } */
  // await Post.bulkCreate(postData);

  const post = await Post.bulkCreate(postData, {
    user_id: users[Math.floor(Math.random() * users.length)].id,
  });

  const comments = await Comments.bulkCreate(commentData, {
    user_id: users[Math.floor(Math.random() * users.length)].id,
    post_id: post.id,
  });

  // const comments = 
  // await Comments.bulkCreate(commentData);
/* 
  for (const comment of commentData) {
    await Comments.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: post.id,
    });
  } */

  process.exit(0);
};

seedDatabase();
