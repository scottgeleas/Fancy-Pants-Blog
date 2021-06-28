const router = require('express').Router();
const session = require('express-session');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    // 1 create tech-blog database with seeded data
    // 2 connect to the database with the blog
    // 3 hand off data to handlebars (res.render('filename', {DATA}))
    // 4 print the data in homepage.handlebars
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        console.log(postData);


        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts: posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
 try {
    // render the dashboard page and get all posts by current logged in user
    const userPostData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });


    // Serialize data so the template can read it
    const userPosts = userPostData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
        userPosts: userPosts,
        loggedIn: req.session.loggedIn
    });
 } catch (err) {
     res.status(500).json(err);
 }

});


router.get('/login', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');

            return;
        }

        res.render('login', {
            pageTitle: 'Login',
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');

            return;
        }

        res.render('signup', {
            pageTitle: 'signup',
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/logout', async (req, res) => {
    try {
       // this should clear the session and redirect to '/' (index)
       if (req.session.loggedIn) {
           req.session.destroy();
                res.status(204)
        }
        res.redirect('/');
        return;
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/post/:id", async (req, res) => {
    try {
       let singlePost = await Post.findOne({
           where: {
               id: req.params.id
           },
           include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['id', "text", "date_created", "post_id", "user_id"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
        ],
       })

       if(!singlePost) {
           res.status(404).json({ message: 'No post found with this id' });
           return
       }
       console.log(singlePost.toJSON())
    //    const post = singlePost.get({plain: true})
    //    res.json({post: singlePost})

        res.render("single-post", {post: singlePost.toJSON(), loggedIn: req.session.loggedIn})
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/post/:id", async (req, res) => {
    try {
       let singlePost = await Post.findOne({
           where: {
               id: req.params.id
           },
           include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['id', "text", "date_created", "post_id", "user_id"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
        ],
       })

       if(!singlePost) {
           res.status(404).json({ message: 'No post found with this id' });
           return
       }

        res.render("edit-post", {post: singlePost.toJSON(), loggedIn: req.session.loggedIn})
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/new-post", async (req, res) => {
    res.render("create-post")
});


module.exports = router;