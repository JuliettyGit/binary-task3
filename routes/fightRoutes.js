const { Router } = require('express');
const FightService = require('../services/fightService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFightValid } = require('../repositories/fightRepository');

const router = Router();

router.get('/', (req, res, next) => {
    try{
        res.data = FightService.getAll();
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try{
        const id = req.params.id;
        res.data = FightService.getOne(id);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createFightValid, (req, res, next) => {
    try{
        const fightData = req.body;
        res.data = FightService.create(fightData);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', createFightValid, (req, res, next) => {
    try{
        const fightId = req.params.id;
        const fightData = req.body;
        res.data = FightService.update(fightId, fightData);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try{
        const id = req.params.id;
        res.data = FightService.delete(id);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;