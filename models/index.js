const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');


// user can have many posts
/* User.hasMany(Posts, {
  foreignKey: `user_id`,
  onDelete: 'CASCADE'
});

// post is under only one user
Posts.belongsTo(User, {
  foreignKey: `user_id`,
});

Comments.belongsToMany(User, {
  through: {
      model: Posts,
      unique: false,
  },
});

User.belongsToMany(Comments, {
  through: {
      model: Posts,
      unique: false,
  },
}); */

// Comments can only have one user, but users can have many comments
User.hasMany(Comments, {
  foreignKey: 'user_id',
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
});

// Posts have many Comments; Comments are posted to only one Post
Post.hasMany(Comments, {
  foreignKey: 'post_id',
});

Comments.belongsTo(Post, {
  foreignKey: 'post_id',
});

// users can have many posts (through comments...?)
/* User.belongsToMany(Post, {
  through: {
    model: Comments,
    unique: false,
  },
}); */
User.hasMany(Post, {
  foreignKey: `user_id`,
  onDelete: 'CASCADE'
});

// post is under only one user
Post.belongsTo(User, {
  foreignKey: `user_id`,
});

/* Post.hasMany(Comments, {

}) */

/* User.hasMany(Comments, {
  foreignKey: 'user_id',
}) */

// post can have many comments
// users can post many comments

// posts & users can have many comments
/* Comments.hasMany(Posts, {
  foreignKey: 'post_id',
})

Comments.hasMany(User, {
  foreignKey: 'user_id',
}) */



module.exports = { User, Comments, Post };
