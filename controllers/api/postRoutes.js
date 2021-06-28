const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({})
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, async(req, res) => {
    try {
        let newPost = {
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        };
        console.log(req.body)
        // console.log(newPost)
        const postData = await Post.create(newPost);
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    const requestData = await Post.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(req.body)
});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No posts found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;