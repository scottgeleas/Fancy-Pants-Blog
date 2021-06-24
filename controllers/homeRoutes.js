const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    // 1 create tech-blog database with seeded data
    // 2 connect to the database with the blog
    // 3 hand off data to handlebars (res.render('filename', {DATA}))
    // 4 print the data in homepage.handlebars
    console.log('step 1')
    try {
        const postdata = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        console.log(postData);

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;