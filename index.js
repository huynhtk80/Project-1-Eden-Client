import * as readline from 'readline';
import readlineSync from 'readline-Sync'
import { doCurrentAction, locCompare, printCurrentActions } from './event.js';
import { clearScreen, cursorTo, hideCursor, showCursor, moveUp, moveRight, moveDown, moveLeft, initGame, updateStats, printMessage, npObjects, populateNP, fillPointMap, map, myGreyhound, templateObj, updateOnlinePlayer } from './map.js';
import cfonts from 'cfonts';
import { loadGreyhoundGet, newGreyhoundPost, PORT } from './client.js';
import fetch from 'node-fetch';

const { stdin, stdout } = process;

const newPlayer = async () => {
    let name = readlineSync.question('What would you like to name your greyhound: ', { hideEchoBack: false, limit: /[\S\s]+[\S]+/, limitMessage: 'can not be blank' });
    let icon = readlineSync.keyIn('Select a Keyboard Char to represent your greyhound: ', { hideEchoBack: false });

    Object.assign(myGreyhound, templateObj)
    myGreyhound.name = name;
    myGreyhound.icon = icon;
    myGreyhound.online = true;
    myGreyhound.lastOnline = Date.now();
    let result = await newGreyhoundPost();
    console.log(result)
    if (result === 'try again') {
        console.log('GreyHound Name already Exist')
        await newPlayer();
    }
}

// const loadPlayer = (tempGrey) => {

//     let pause = readlineSync.question("temp hold")
//     console.log("Temp Grey:", tempGrey)

//     console.log(myGreyhound)

// }
clearScreen();
cfonts.say('Eden\'s \nAdventure', {
    font: 'tiny',              // define the font face
    align: 'center',              // define text alignment
    colors: ['blue'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many character can be on one line
    gradient: ['blue', 'red'],            // define your two gradient colors
    independentGradient: true, // define if you want to recalculate the gradient for each new line
    transitionGradient: true,  // define if this is a transition between colors directly
    env: 'node'                 // define the environment cfonts is being executed in
});

const MENUOPT = ['Adopt a New Greyhound', 'Load existing Greyhound', 'Help']
let index = readlineSync.keyInSelect(MENUOPT, 'Menu Options', { cancel: false });

switch (MENUOPT[index]) {
    case 'Adopt a New Greyhound':
        await newPlayer();
        console.log("adopt new")
        break;
    case 'Load existing Greyhound':
        let noload = true;
        while (noload === true) {
            let name = readlineSync.question('What is the name of your greyhound: ', { hideEchoBack: false, limit: /[\S\s]+[\S]+/, limitMessage: 'can not be blank' });
            console.log(name)
            const response = await fetch(`http://localhost:${PORT}/greyhound?name=${name}`, {
                method: 'GET'
            })
            const data = await response.json();
            if (data.name === 'ERROR') {
                console.log("greyhound not found, try again")
            } else {
                Object.assign(myGreyhound, data)
                noload = false;
            }
            console.log("loading greyhound")
        }
        break;

}




const turnOnKeypress = () => {
    stdin.resume();
    readline.emitKeypressEvents(stdin);
    stdin.setRawMode(true);
    stdin.setEncoding('utf8');
    stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            showCursor();
            cursorTo(1, 1);
            clearScreen();
            process.stdout.write(`Good Bye`);
            return process.exit(0);
        }

        switch (key.name) {
            case 'up':
                moveUp();
                break;
            case 'right':
                moveRight();
                break;
            case 'down':
                moveDown();
                break;
            case 'left':
                moveLeft();
                break
            case '1':
                doCurrentAction(1);
                break;
            case '2':
                doCurrentAction(2)
                break;
            case '3':
                doCurrentAction(3)
                break;
            case '4':
                doCurrentAction(4)
                break;
        }
        locCompare();
        printCurrentActions();
        updateStats();
    });
}



// ==================== Game Map Start====================


hideCursor();

initGame();
turnOnKeypress();


const moveCar = () => {
    if (myGreyhound.loc.x === npObjects[1].locx + 1 && myGreyhound.loc.y == npObjects[1].locy) {
        printMessage('Wow that was a close one!!!!')
        //edenObj.CurStamina = edenObj.CurStamina - 10;
    } else if (npObjects[1].locx > 46) {
        fillPointMap(npObjects[1].locy, npObjects[1].locx, map[npObjects[1].locy][npObjects[1].locx])
        npObjects[1].locx = 0
        fillPointMap(npObjects[1].locy, npObjects[1].locx, npObjects[1].icon)
    } else {
        fillPointMap(npObjects[1].locy, npObjects[1].locx, map[npObjects[1].locy][npObjects[1].locx])
        npObjects[1].locx++
        fillPointMap(npObjects[1].locy, npObjects[1].locx, npObjects[1].icon)
    }
}

const moveCar2 = () => {

    if (myGreyhound.loc.x === npObjects[2].locx - 1 && myGreyhound.loc.y == npObjects[2].locy) {
        printMessage('Wow that was a close one!!!!')
        //edenObj.CurStamina = edenObj.CurStamina - 10;
    } else if (npObjects[2].locx <= 0) {
        fillPointMap(npObjects[2].locy, npObjects[2].locx, map[npObjects[2].locy][npObjects[2].locx])
        npObjects[2].locx = 47
        fillPointMap(npObjects[2].locy, npObjects[2].locx, npObjects[2].icon)
    } else {
        fillPointMap(npObjects[2].locy, npObjects[2].locx, map[npObjects[2].locy][npObjects[2].locx])
        npObjects[2].locx--
        fillPointMap(npObjects[2].locy, npObjects[2].locx, npObjects[2].icon)
    }
}

const calcDistance = (x1, x2, y1, y2) => {
    return Math.floor(Math.sqrt((Math.abs(x1 - x2)) ** 2 + (Math.abs(y1 - y2)) ** 2))
}
const movePuppy = () => {
    let distance = calcDistance(myGreyhound.loc.x, npObjects[0].locx, myGreyhound.loc.y, npObjects[0].locy)

    if (distance > 1 && distance < 6) {
        fillPointMap(npObjects[0].locy, npObjects[0].locx, map[npObjects[0].locy][npObjects[0].locx])
        if (myGreyhound.loc.x > npObjects[0].locx) {
            npObjects[0].locx++;
        } else if (myGreyhound.loc.x < npObjects[0].locx) {
            npObjects[0].locx--;
        }
        if (myGreyhound.loc.y > npObjects[0].locy) {
            npObjects[0].locy++;
        } else if (myGreyhound.loc.y < npObjects[0].locy) {
            npObjects[0].locy--;
        }
        fillPointMap(npObjects[0].locy, npObjects[0].locx, npObjects[0].icon)
        printMessage('this puppy really likes me')

    }
}
setInterval(moveCar, 250)
setInterval(moveCar2, 200)
setInterval(movePuppy, 500)

setInterval(updateOnlinePlayer, 250)







