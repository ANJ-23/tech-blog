const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

// Comments can only have one User
User.hasMany(Comments, {
  foreignKey: 'user_id',
});
// Users can have many Comments
Comments.belongsTo(User, {
  foreignKey: 'user_id',
});


// Posts have many Comments
Post.hasMany(Comments, {
  foreignKey: 'post_id',
});
// Comments are posted to only one Post
Comments.belongsTo(Post, {
  foreignKey: 'post_id',
});


// Users can have many Posts
User.hasMany(Post, {
  foreignKey: `user_id`,
  onDelete: 'CASCADE'
});
// Post is under only one User
Post.belongsTo(User, {
  foreignKey: `user_id`,
});

module.exports = { User, Comments, Post };
