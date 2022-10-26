import * as readline from 'readline';
import { doCurrentAction, locCompare, printCurrentActions } from './event.js';
import { clearScreen, cursorTo, showCursor, moveUp, moveRight, moveDown, moveLeft, initGame, updateStats, printMessage, fillPointMap, updateOnlinePlayer, collision, messagePlayers } from './map.js';
import cfonts from 'cfonts';
import { myGreyhound, npObjects, currentMap } from "./cont.js"
import { menu } from './menu.js';
import { messageGet } from './client.js';

const { stdin, stdout } = process;



export const delay = ms => new Promise(r => setTimeout(r, ms));

//key press logic and startup
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
            case 'w':
                moveUp();
                break;
            case 'right':
            case 'd':
                moveRight();
                break;
            case 'down':
            case 's':
                moveDown();
                break;
            case 'left':
            case 'a':
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
            case 'space':
                messagePlayers();
                break;
        }
        //console.log('x: ', myGreyhound.loc.x, ' y: ', myGreyhound.loc.y)
        locCompare();
        printCurrentActions();
        updateStats();

    });
}

// Program Start
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
await menu();
await delay(2000)
initGame();
turnOnKeypress();


const moveCar = () => {
    if (myGreyhound.loc.map === 1) {
        if (myGreyhound.loc.x === npObjects[1].loc.x + 1 && myGreyhound.loc.y == npObjects[1].loc.y) {
            printMessage('Wow that was a close one!!!!')
            //edenObj.CurStamina = edenObj.CurStamina - 10;
        } else if (npObjects[1].loc.x > 46) {
            fillPointMap(npObjects[1].loc.y, npObjects[1].loc.x, currentMap[npObjects[1].loc.y][npObjects[1].loc.x])
            npObjects[1].loc.x = 0
            fillPointMap(npObjects[1].loc.y, npObjects[1].loc.x, npObjects[1].icon)
        } else {
            fillPointMap(npObjects[1].loc.y, npObjects[1].loc.x, currentMap[npObjects[1].loc.y][npObjects[1].loc.x])
            npObjects[1].loc.x++
            fillPointMap(npObjects[1].loc.y, npObjects[1].loc.x, npObjects[1].icon)
        }
    }
}

const moveCar2 = () => {
    if (myGreyhound.loc.map === 1) {
        if (myGreyhound.loc.x === npObjects[2].loc.x - 1 && myGreyhound.loc.y == npObjects[2].loc.y) {
            printMessage('Wow that was a close one!!!!')
            //edenObj.CurStamina = edenObj.CurStamina - 10;
        } else if (npObjects[2].loc.x <= 0) {
            fillPointMap(npObjects[2].loc.y, npObjects[2].loc.x, currentMap[npObjects[2].loc.y][npObjects[2].loc.x])
            npObjects[2].loc.x = 47
            fillPointMap(npObjects[2].loc.y, npObjects[2].loc.x, npObjects[2].icon)
        } else {
            fillPointMap(npObjects[2].loc.y, npObjects[2].loc.x, currentMap[npObjects[2].loc.y][npObjects[2].loc.x])
            npObjects[2].loc.x--
            fillPointMap(npObjects[2].loc.y, npObjects[2].loc.x, npObjects[2].icon)
        }
    }
}

export const calcDistance = (x1, x2, y1, y2) => {
    return Math.floor(Math.sqrt((Math.abs(x1 - x2)) ** 2 + (Math.abs(y1 - y2)) ** 2))
}
const movePuppy = () => {
    if (myGreyhound.loc.map === 1) {
        let distance = calcDistance(myGreyhound.loc.x, npObjects[0].loc.x, myGreyhound.loc.y, npObjects[0].loc.y)

        if (distance > 1 && distance < 6) {
            fillPointMap(npObjects[0].loc.y, npObjects[0].loc.x, currentMap[npObjects[0].loc.y][npObjects[0].loc.x])
            if (myGreyhound.loc.x > npObjects[0].loc.x) {
                npObjects[0].loc.x++;
            } else if (myGreyhound.loc.x < npObjects[0].loc.x) {
                npObjects[0].loc.x--;
            }
            if (myGreyhound.loc.y > npObjects[0].loc.y) {
                npObjects[0].loc.y++;
            } else if (myGreyhound.loc.y < npObjects[0].loc.y) {
                npObjects[0].loc.y--;
            }
            fillPointMap(npObjects[0].loc.y, npObjects[0].loc.x, npObjects[0].icon)
            printMessage('this puppy really likes me')
        }
    }
}

const checkMsg = async () => {
    const message = await messageGet();
    if (message !== 'no messages') {
        printMessage(message)
    }

}
setInterval(moveCar, 250)
setInterval(moveCar2, 200)
setInterval(movePuppy, 500)

setInterval(updateOnlinePlayer, 250)
setInterval(checkMsg, 1000)







