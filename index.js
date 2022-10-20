import { emitKeypressEvents } from 'readline';
import { doCurrentAction, locCompare, printCurrentActions } from './event.js';
import { clearScreen, cursorTo, hideCursor, showCursor, moveUp, moveRight, moveDown, moveLeft, initGame, updateStats, printMessage, npObjects, populateNP, fillPointMap, map, edenObj } from './map.js';

const { stdin, stdout } = process;

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

// ==================== MAIN THREAD ====================

emitKeypressEvents(stdin);
stdin.setRawMode(true);
stdin.setEncoding('utf8');

hideCursor();

initGame();

const moveCar = () => {
    if (edenObj.loc.x === npObjects[1].locx + 1 && edenObj.loc.y == npObjects[1].locy) {
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

    if (edenObj.loc.x === npObjects[2].locx - 1 && edenObj.loc.y == npObjects[2].locy) {
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


    let distance = calcDistance(edenObj.loc.x, npObjects[0].locx, edenObj.loc.y, npObjects[0].locy)

    if (distance > 1 && distance < 6) {
        fillPointMap(npObjects[0].locy, npObjects[0].locx, map[npObjects[0].locy][npObjects[0].locx])
        if (edenObj.loc.x > npObjects[0].locx) {
            npObjects[0].locx++;
        } else if (edenObj.loc.x < npObjects[0].locx) {
            npObjects[0].locx--;
        }
        if (edenObj.loc.y > npObjects[0].locy) {
            npObjects[0].locy++;
        } else if (edenObj.loc.y < npObjects[0].locy) {
            npObjects[0].locy--;
        }
        fillPointMap(npObjects[0].locy, npObjects[0].locx, npObjects[0].icon)
        printMessage('this puppy really likes me')

    }
}
setInterval(moveCar, 250)
setInterval(moveCar2, 200)
setInterval(movePuppy, 500)







