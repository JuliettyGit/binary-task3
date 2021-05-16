const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    try{
        res.data = FighterService.getAll();
    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try{
        const id = req.params.id;
        res.data = FighterService.getOne(id);
    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
    if(res.err){
        next();
        return;
    }

    try{
        const fighterData = req.body;
        res.data = FighterService.create(fighterData);
    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
    if(res.err){
        next();
        return;
    }

    try{
        const fighterId = req.params.id;
        const fighterData = req.body;
        res.data = FighterService.update(fighterId, fighterData);
    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try{
        const id = req.params.id;
        res.data = FighterService.delete(id);
    } catch(err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);


module.exports = router;