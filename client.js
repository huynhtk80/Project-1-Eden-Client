import fetch from 'node-fetch';
import readlineSync from 'readline-sync'


export const URI = 'http://localhost'
export const PORT = 4002;

//
export const newGreyhoundPost = async () => {
    const response = await fetch(`${URI}:${PORT}/greyhound`, {
        method: 'post',
        body: JSON.stringify(myGreyhound),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.text();

    return data;
}

export const loadGreyhoundGet = async (name) => {
    const response = await fetch(`${URI}:${PORT}/greyhound?name=${name}`, {
        method: 'GET'
    })
    const data = await response.json();
    //let pause = readlineSync.question("temp hold")
    return data;
}

export const updateOnline = async (update) => {
    const response = await fetch(`${URI}:${PORT}/greyhound`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json();
    return data
}

export const saveGreyhoundPut = async () => {
    const response = await fetch(`${URI}:${PORT}/greyhound`, {
        method: 'PUT',
        body: JSON.stringify(myGreyhound),
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.text();
    return data
}