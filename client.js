import fetch from 'node-fetch';
import readlineSync from 'readline-sync'
import { myGreyhound } from './map.js';

export const PORT = 4002;

export const newGreyhoundPost = async () => {
    const response = await fetch(`http://localhost:${PORT}/greyhound`, {
        method: 'post',
        body: JSON.stringify(myGreyhound),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.text();

    return data;
}

export const loadGreyhoundGet = async (name) => {
    const response = await fetch(`http://localhost:${PORT}/greyhound?name=${name}`, {
        method: 'GET'
    })
    const data = await response.json();
    let pause = readlineSync.question("temp hold")
    return data;
}