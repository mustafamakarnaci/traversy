const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exist' }] });
            }

            const avatar = gravatar.url(email, {
                //options
                s: '200',//size
                r: 'pg',//rating: naked peaople block
                d: 'mm',//give default images like user icon
            })

            user = new User({//instance of a user
                name,
                email,
                avatar,
                password,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);
            
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtsecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });


            //
            res.send('User registered')
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }

    });


module.exports = router;