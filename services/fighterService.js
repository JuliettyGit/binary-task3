const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    getAll() {
        const items = FighterRepository.getAll();
        if(!items)
        {
            throw Error('There are no fighter yet.');
        }
        return items;
    }

    getOne(id) {
        const item = FighterRepository.getOne({ id });
        if(!item)
        {
            throw Error('There is no such fighter');
        }
        return item;
    }

    create(fighter){
        const item = FighterRepository.create(fighter);
        if(!item){
            throw Error('There are some problems with fighter creation.');
        }
        return item;
    }

    update(id, fighter){
        const item = FighterRepository.update(id, fighter);
        if(!item.id)
        {
            throw Error(`Unable to update fighter with id ${id}`);
        }
        return item;
    }

    delete(id){
        const item = FighterRepository.delete(id);
        if(!item.length)
        {
            throw Error(`Unable to delete fighter with id ${id}`);
        }
        return item;
    }

    search(search){
        const item = FighterRepository.getOne(search);
        if(!item)
        {
            return null;
        }
        return item;
    }

}

module.exports = new FighterService();