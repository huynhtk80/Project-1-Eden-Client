import fetch from 'node-fetch';
import { myGreyhound } from './cont.js';

export const PORT = 4002;

//export const URI = `http://localhost:${PORT}`
export const URI = 'https://guarded-atoll-77874.herokuapp.com'


// create new greyhound
export const newGreyhoundPost = async () => {
    const response = await fetch(`${URI}/greyhound`, {
        method: 'post',
        body: JSON.stringify(myGreyhound),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.text();
    return data;
}

//load existing greyhound
export const loadGreyhoundGet = async (name) => {
    const response = await fetch(`${URI}/greyhound?name=${name}`, {
        method: 'GET'
    })
    const data = await response.json();
    return data;
}

export const updateOnline = async (update) => {
    const response = await fetch(`${URI}/greyhound`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json();
    return data
}

export const saveGreyhoundPut = async () => {
    const response = await fetch(`${URI}/greyhound`, {
        method: 'PUT',
        body: JSON.stringify(myGreyhound),
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.text();
    return data
}

export const messagePost = async (canMSG) => {
    const response = await fetch(`${URI}/message`, {
        method: 'post',
        body: JSON.stringify(canMSG),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.text();
    return data;
}

export const messageGet = async () => {
    const response = await fetch(`${URI}/message?name=${myGreyhound.name}`);
    const message = await response.text();
    return message;
}

