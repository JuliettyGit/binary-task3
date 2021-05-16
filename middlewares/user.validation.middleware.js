const { user } = require('../models/user');
const userService = require('../services/userService');
const createUserValid = (req, res, next) => {
    try {
        validData(req);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
};

const updateUserValid = (req, res, next) => {
    try {
        validData(req);
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }

}

const validData = (req) =>
{
    const {
        body,
        body: {email, phoneNumber},
        params: {id = ""},
    } = req;

    if(!validFirstName(body))
    {
        throw new Error('First name is too short');
    }
    if(!validLastName(body))
    {
        throw new Error('Last name is too short');
    }
    if(!validEmail(body))
    {
        throw new Error('Invalid email. Email must contain gmail.com.');
    }
    if(!validPhoneNumber(body))
    {
        throw new Error('Invalid phone number. Phone number must contain +380.');
    }
    if(!validPassword(body))
    {
        throw new Error('Password must contain 3 or more than symbols.')
    }
    if(alreadyTaken({email}, id))
    {
        throw new Error('This email is already taken')
    }
    if(alreadyTaken({phoneNumber}, id))
    {
        throw new Error('This phone number is already taken')
    }
}

const validFirstName = ({firstName}) =>
{
    return(firstName.trim().length > 0)
}

const validLastName = ({lastName}) =>
{
    return(lastName.trim().length > 0)
}

const validEmail = ({ email }) =>
{
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (emailPattern.test(String(email).toLowerCase()) &&
            String(email).trim().endsWith("@gmail.com"))
}

const validPhoneNumber = ({phoneNumber}) =>
{
    const phoneNumberPattern = /^\+380\d{9}$/;
    return phoneNumberPattern.test(String(phoneNumber).trim());
}

const validPassword = ({password}) =>
{
    return(password.trim().length >= 3)
}

const alreadyTaken = (search, id) => {
    const item = userService.search(search);
    if (!item) {
        return false;
    }
    return !(id === item.id);
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;