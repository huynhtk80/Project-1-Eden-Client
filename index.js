import { emitKeypressEvents } from 'readline';
import terminalImage from 'terminal-image';
//import rl from 'readline-sync';

const { stdin, stdout } = process;

// ==================== CONSTANTS ====================

const TICK_TIMEOUT = 150;

const BOX = {
    TOP_LEFT_CORNER: '\u250C',
    TOP_RIGHT_CORNER: '\u2510',
    BOTTOM_LEFT_CORNER: '\u2514',
    BOTTOM_RIGHT_CORNER: '\u2518',
    HORIZONTAL_LINE: '\u2500',
    VERTICAL_LINE: '\u2502',
};

const EdenChar = 'D';

// ==================== CLI ====================
//const { columns, rows } = stdout;
let columns = 50
let rows = 20;

const cursorTo = (row = 1, column = 1) => stdout.cursorTo(column - 1, row - 1);
const moveCursor = (h, v) => stdout.moveCursor(h, v);
const clearScreen = () => stdout.write('\x1b[2J');
const showCursor = () => stdout.write('\x1b[?25h');
const hideCursor = () => stdout.write('\x1b[?25l');
const screenSize = () => stdout.write('\x1b[8;99999;99999t')
const resizeWindow = () => console.log('\x1b[4;40;100t');
const output = data => stdout.write(data);
screenSize();
resizeWindow();
const fillPoint = (r, c, char) => {
    cursorTo(r, c);
    output(char);
};

const clearPoints = (a, b) => fillPoint(a, b, ' ');

// ==================== BUSINESS LOGIC ====================

const edenLocation = [5, 10];

const drawDog = () => {
    let edenImage = [
        '            /)-_-(\\        /)-_-(\\',
        "             (o o)          (o o)'",
        '     .-----__/\\o/            \\o/\\__-----.',
        '    /  __      /              \\      __  \\',
        '\\__/\\ /  \\_\\ |/                \\| /_/  \\ /\\__/',
        '     \\\\     ||                  ||      \\\\',
        '     //     ||                  ||      //',
        '     |\\     |\\                  /|     /|']

    for (let x = 2; x <= edenImage.length + 1; x++) {
        cursorTo(x, 2)
        output(edenImage[x - 2])
    }
}
const drawMap = () => {
    let map =
        ['0____',
            '1hhhhh     ssss\n',
            '2hhhhh     ssss\n',
            '3grass stret   \n',
            '4______'
        ]
    for (let x = 2; x <= map.length; x++) {
        cursorTo(x, 2)
        output(map[x - 1])
    }
}

const drawBoard = () => {
    let i = -1;

    clearScreen();
    cursorTo(1, 1);
    //top box
    for (i = 0; i < columns; ++i) {
        if (i === 0) output(BOX.TOP_LEFT_CORNER);
        else if (i === columns - 1) output(BOX.TOP_RIGHT_CORNER);
        else output(BOX.HORIZONTAL_LINE);
    }

    cursorTo(2, columns);
    //rightbox
    for (i = 0; i < rows - 1; ++i) {
        if (i === rows - 2) output(BOX.BOTTOM_RIGHT_CORNER);
        else output(BOX.VERTICAL_LINE);
        moveCursor(-1, 1);
    }

    cursorTo(rows, columns - 1);

    for (i = 0; i < columns - 1; ++i) {
        if (i === columns - 2) output(BOX.BOTTOM_LEFT_CORNER);
        else output(BOX.HORIZONTAL_LINE);
        moveCursor(-2, 0);
    }

    cursorTo(rows - 1, 1);

    for (i = 0; i < rows - 2; ++i) {
        output(BOX.VERTICAL_LINE);
        moveCursor(-1, -1);
    }
    cursorTo(0, 0)

};

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
            clearPoints(...edenLocation)
            if (edenLocation[0] > 2) {
                edenLocation[0]--
            }
            fillPoint(...edenLocation, 'D')
            break;
        case 'right':
            clearPoints(...edenLocation)
            if (edenLocation[1] < columns - 1) {
                edenLocation[1]++
            }
            fillPoint(...edenLocation, 'D')
            break;
        case 'down':
            clearPoints(...edenLocation)
            if (edenLocation[0] < rows - 1) {
                edenLocation[0]++
            }
            fillPoint(...edenLocation, 'D')
            break;
        case 'left':
            clearPoints(...edenLocation)
            if (edenLocation[1] > 2) {
                edenLocation[1]--
            }
            fillPoint(...edenLocation, 'D')
            break
    }
});







// ==================== MAIN THREAD ====================

emitKeypressEvents(stdin);
stdin.setRawMode(true);
stdin.setEncoding('utf8');


hideCursor();
console.log(rows, ' ', columns)
drawBoard();
drawMap();
drawDog();
fillPoint(...edenLocation, 'D')
let play = true;
//while (play === true) {
setTimeout(function () { clearPoints(...edenLocation) }, 3000)
setTimeout(function () { fillPoint(5, 20, 'D'); }, 6000)
    // key = rl.keyIn('', { hideEchoBack: true, mask: '', limit: 'zx ' });
    // if (key === 'z') { if (value > MIN) { value--; } }
    // else if (key === 'x') { if (value < MAX) { value++; } }
    // else { break; }
//}
//setupGame();



//     __    __
//     \/----\/
//      \0  0/    WOOF!
//      _\  /_
//    _|  \/  |_
//   | | |  | | |
//  _| | |  | | |_
// "---|_|--|_|---"

//             .--~~,__
// :-....,-------`~~'._.'
//  `-,,,  ,_      ;'~U'
//   _,-' ,'`-__; '--.
//  (_/'~~      ''''(;


//    [^]
// [<][V][>]