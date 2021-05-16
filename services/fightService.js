const { FightRepository } = require('../repositories/fightRepository');

class FightersService {
    getAll() {
        const items = FightRepository.getAll();
        if(!items){
            throw Error('There are no fight yet.');
        }
        return items;
    }

    getOne(id) {
        const item = FightRepository.getOne({id});
        if(!item){
            throw Error('There is no such fight');
        }
        return item;
    }

    create(fight) {
        const item = FightRepository.create(fight);
        if(!item)
        {
            throw Error('There are some problems with fight creation.');
        }
        return item;
    }

    update(id, fight) {
        const item = FightRepository.update(id, fight);
        if(!item.id)
        {
            throw Error(`Unable to update fight with id ${id}`);
        }
        return item;
    }

    delete(id) {
        const item = FightRepository.delete(id);
        if(!item.length)
        {
            throw Error(`Unable to delete fight with id ${id}`);
        }
        return item;
    }

    search(search) {
        const item = FightRepository.getOne(search);
        if(!item)
        {
            return null;
        }
        return item;
    }
}

module.exports = new FightersService();