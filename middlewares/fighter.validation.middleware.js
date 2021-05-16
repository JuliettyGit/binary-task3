const { fighter } = require('../models/fighter');
const fighterService = require("../services/fighterService");

const createFighterValid = (req, res, next) => {
    try {
        validData(req);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

const updateFighterValid = (req, res, next) =>
{
    try
    {
        validData(req);
    } catch (err)
    {
        res.err = err;
    } finally
    {
        next();
    }
}

const validData = (req) =>
{
    const {
        body,
        body: {name, power, defence, health},
        params: {id = ""},
    } = req;

    if (!validName(body))
    {
        throw new Error(`This name is too short.`);
    }

    if (!validPower(body))
    {
        throw new Error(`Power must be between 1 and 100`);
    }

    if (!validDefense(body))
    {
        throw new Error(`Defense must be between 1 and 10`);
    }

    if (!validHealth(body))
    {
        throw new Error(`Health must be between 80 and 120`);
    }

    if(alreadyTaken({name}, id))
    {
        throw new Error('This email is already taken')
    }
}

const validName = ({ name }) =>
{
    return name.trim().length >= 2;
}

const validPower = ({ power }) =>
{
    return typeof power == "number" && Number.isInteger(power) && power >= 1 && power <= 100;
}

const validDefense = ({ defense }) => {
    return (typeof defense == "number" && Number.isInteger(defense) && defense >= 1 && defense <= 10
    )
}

const validHealth = ({ health }) => {
    return (typeof health == "number" && Number.isInteger(health) && health >= 80 && health <= 120
    )
}

const alreadyTaken = (search, id) => {
    const item = fighterService.search(search);
    if (!item) {
        return false;
    }
    return !(id === item.id);
}



exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;