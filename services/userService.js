const { UserRepository } = require('../repositories/userRepository');

class UserService {

    getAll()
    {
        const items = UserRepository.getAll();
        if(!items)
        {
            throw Error('There are no users yet.');
        }
        return items;
    }

    getOne(id)
    {
        const item = UserRepository.getOne({ id });
        if(!item)
        {
            throw Error('There is no such user');
        }
        return item;
    }

    create(user)
    {
        const item = UserRepository.create(user);
        if(!item)
        {
            throw Error('There are some problems with user creation.');
        }
        return item;
    }

    update(id, user)
    {
        const item = UserRepository.update(id, user);
        if(!item.id)
        {
            throw Error(`Unable to update user with id ${id}`);
        }
        return item;
    }

    delete(id)
    {
        const item = UserRepository.delete(id);
        if(!item.length)
        {
            throw Error(`Unable to delete user with id ${id}`);
        }
        return item;
    }

    search(search)
    {
        const item = UserRepository.getOne(search);
        if(!item)
        {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();