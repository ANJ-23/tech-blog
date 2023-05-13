const sequelize = require('../config/connection');
const { Post, User } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  /* for (const p of postData) {
    await Post.create({
      ...p,
      user_id: users.id,
    });
  } */

  // await User.bulkCreate(userData);

  await Post.bulkCreate(postData, {
    user_id: users.id,
  });

  process.exit(0);
};

seedDatabase();
