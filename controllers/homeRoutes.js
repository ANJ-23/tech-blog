const router = require('express').Router();
const { Post, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Default route - homepage
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts[0].date_posted);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    // obtains Post data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comments,
          // attributes: ['text', 'date_created', 'user_id']
        }
      ],
    });

    // obtains Comment data
    /* const commentData = await Comments.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Post,
        }
      ],
    }); */

    // serializes post & comment
    const post = postData.get({ plain: true });
    // const comments = commentData.get({ plain: true });

    // renders 'post' handlebar
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });

    // renders 'comments' handlebar
    
    /* res.render('comments', {
      ...comments,
      logged_in: req.session.logged_in
    }) */
   
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// if logged in, render DASHBOARD (user's posts + "New Post" button)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // serializes 'userData' into a new 'user variable; includes only the data needed. 
    const user = userData.get({ plain: true });

    // renders 'dashboard.handlebars'
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  // otherwise, render the Login page
  res.render('login');
});

module.exports = router;
