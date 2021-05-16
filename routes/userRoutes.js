const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    try {
        res.data = UserService.getAll();
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        res.data = UserService.getOne(id);
    } catch(err){
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
    if(res.err){
        next();
        return;
    }

    try {
        const userData = req.body;
        res.data = UserService.create(userData);
    } catch(err){
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id',updateUserValid, (req, res, next) => {
    if(res.err){
        next();
        return;
    }
    try {
        const userId = req.params.id;
        const userData = req.body;
        res.data = UserService.update(userId, userData);
    } catch(err){
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        res.data = UserService.delete(id);
    } catch(err){
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;