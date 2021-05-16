const createFightValid = (req, res, next) => {
    try {
        validate(req);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}

const validate = (req) => {
    const item = req.body;
    const {fighter1, fighter2} = item;

    if(!isValidFighterId({fighter1}))
    {
        throw Error('First fighter id isn\'t valid.');
    }
    if(!isValidFighterId({fighter2}))
    {
        throw Error('Second fighter id isn\'t valid.');
    }
}

const isValidFighterId = (fighterId) =>
{
    return fighterId === undefined;

}

exports.createFightValid = createFightValid;