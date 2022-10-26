import readlineSync from 'readline-Sync'
import { loadGreyhoundGet, newGreyhoundPost } from './client.js';
import { myGreyhound, templateObj } from './cont.js';
import chalk from 'chalk';
import { delay } from './index.js';

export const menu = async () => {
    const MENUOPT = ['Adopt a New Greyhound', 'Load existing Greyhound', 'Help']
    let index = readlineSync.keyInSelect(MENUOPT, 'Menu Options', { cancel: false });

    switch (MENUOPT[index]) {
        case 'Adopt a New Greyhound':
            await newPlayer();

            break;
        case 'Load existing Greyhound':
            await loadPlayer();
            console.log("loading greyhound")
            break;
        case 'Help':
            await help();
            break;
    }
}

const help = async () => {
    console.log('Greyhounds need your Help!!')
    await delay(2000)
    console.log('Tracks are closing across the US and the dogs have no where to go!')
    await delay(2000)
    console.log('Greyhounds, haven\'t spent much time living a normal life')
    await delay(2000)
    console.log('Help guild your greyhound and adapt to their retired life\n')
    await delay(2000)
    console.log('use your arrow keys (or WASD ) to move around the map')
    console.log('number keys 1-4 will perform the displayed actions\n')
    await delay(2000)
    console.log(chalk.green('Objectives'))
    console.log(chalk.blue('1. Keep your greyhound fed and happy'))
    console.log(chalk.blue('2. Find the missing ball in each location'))
    console.log(chalk.blue('   a. The smell command will help you locate and pick up balls'))
    console.log(chalk.blue('3. Interact with the world and gain experience for your greyhound'))
    console.log(chalk.blue('   a. As you level up you gain more access to new actions'))

    readlineSync.keyInPause('Have Fun!!')

    menu();

}

export const newPlayer = async () => {
    let name = readlineSync.question('What would you like to name your greyhound: ', { hideEchoBack: false, limit: /[\S\s]+[\S]+/, limitMessage: 'can not be blank' });
    let icon = readlineSync.keyIn('Select a Keyboard Char to represent your greyhound: ', { hideEchoBack: false });

    Object.assign(myGreyhound, templateObj)
    myGreyhound.name = name
    myGreyhound.icon = icon;
    myGreyhound.online = true;
    myGreyhound.lastOnline = Date.now();

    let result = await newGreyhoundPost();

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