import {get, post, put} from "../requestHelper";

const entity = 'fighters';

export const getFighters = async () => {
    return await get(entity);
}

export const createFighter = async (body) => {
    return await post(entity, body);
}

export const updateFighter = async (body) => {
    return await put(entity, body.id, body);
}