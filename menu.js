import readlineSync from 'readline-Sync'
import { loadGreyhoundGet, newGreyhoundPost } from './client.js';
import { myGreyhound, templateObj } from './cont.js';


export const menu = async () => {
    const MENUOPT = ['Adopt a New Greyhound', 'Load existing Greyhound', 'Help']
    let index = readlineSync.keyInSelect(MENUOPT, 'Menu Options', { cancel: false });

    switch (MENUOPT[index]) {
        case 'Adopt a New Greyhound':
            await newPlayer();
            console.log("adopt new")
            break;
        case 'Load existing Greyhound':
            await loadPlayer();
            console.log("loading greyhound")
            break;
    }
}


export const newPlayer = async () => {
    let name = readlineSync.question('What would you like to name your greyhound: ', { hideEchoBack: false, limit: /[\S\s]+[\S]+/, limitMessage: 'can not be blank' });
    let icon = readlineSync.keyIn('Select a Keyboard Char to represent your greyhound: ', { hideEchoBack: false });

    Object.assign(myGreyhound, templateObj)
    myGreyhound.name = name
    myGreyhound.icon = icon;
    myGreyhound.online = true;
    myGreyhound.lastOnline = Date.now();
    console.log(myGreyhound.lastOnline)
    let result = await newGreyhoundPost();
    console.log(result)
    if (result === 'try again') {
        console.log('GreyHound Name already Exist')
        await newPlayer();
    }
}

export const loadPlayer = async (tempGrey) => {
    let noload = true;
    while (noload === true) {
        let name = readlineSync.question('What is the name of your greyhound: ', { hideEchoBack: false, limit: /[\S\s]+[\S]+/, limitMessage: 'can not be blank' });
        let data = await loadGreyhoundGet(name);
        if (data === 'not found') {
            console.log("greyhound not found, try again")
        } else {
            Object.assign(myGreyhound, data)
            noload = false;
        }
    }
}