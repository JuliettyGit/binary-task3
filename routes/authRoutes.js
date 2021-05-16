const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try
    {
        const userData = req.body;
        const user = AuthService.login(userData)
        if (!user)
        {
            res.status(404);
            throw new Error('User was not found')
        }
        if(user.password !== req.body.password){
            res.status(400)
            throw new Error('Incorrect password')
        }
        res.data = user;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;