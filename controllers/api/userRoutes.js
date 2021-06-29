const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');


router.post('/signup', async (req, res) => {
    try {
        let newUser = {
            username: req.body.username,
            password: req.body.password,
        };


        const userData = await User.create(newUser);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            },
        });

        if (!userData) {
            res.status(400).json({
                message: 'Incorrect email address, please try again!',
            });
            return;
        }

        const isValidPassword = await userData.checkPassword(req.body.password);

        if (!isValidPassword) {
            res.status(400).json({
                message: 'Incorrect password, please try again!',
            });

            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({
                user: userData,
                message: 'You are now logged in!',
            });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;