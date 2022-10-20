import { emitKeypressEvents } from 'readline';
import { doCurrentAction, locCompare, printCurrentActions } from './event.js';
import { clearScreen, cursorTo, hideCursor, showCursor, moveUp, moveRight, moveDown, moveLeft, initGame, updateStats, printMessage } from './map.js';

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






