const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();


// /api/auth
router.post(
    '/register',
    [
        check('email', 'Email is not correct.').isEmail(),
        check('password', 'Minumum length is 6 symbols')
            .isLength({ min: 6 })
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.array(),
                message: 'Data is not valid'
            })
        }
        const { email, password } = request.body;


        const candidate = await User.findOne({ email });
        if(candidate) {
            return response.status(400).json({ message: 'The user already exists.' })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        response.status(201).json({ message: 'User created.' })


    } catch(e) {
        response.status(500).json({ message: 'Something went wrong at register'})
    }
})

// /api/login
router.post(
    '/login',
    [
        check('email', 'Email is not correct').normalizeEmail().isEmail(),
        check('password', 'Password is not correct').exists()
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.status(400).json({
                errors: erros.array(),
                message: 'Data are not valid'
            })
        }

        const { email, password } = request.body;

        const user = await User.findOne({ email });

        if(!user) {
            return response.status(400).json({ message: 'User was not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return response.status(400).json({ message: 'Password is wrong. Try again.' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        response.json({ token, userId: user.id })

    } catch(e) {
        response.status(500).json({ message: 'Something went wrong at login.'})
    }
})


module.exports = router;