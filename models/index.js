const User = require('./User');
const Post = require('./Post');

// user can have many posts
User.hasMany(Post, {
  foreignKey: `userId`,
  onDelete: 'CASCADE'
});

// post is under only one user
Post.belongsTo(User, {
  foreignKey: `userId`,
});

module.exports = { User, Post };
