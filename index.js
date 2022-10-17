import { emitKeypressEvents } from 'readline';
import chalk from 'chalk';
import emoji from 'node-emoji';
//import emojiRegex from 'emoji-regex';

const { stdin, stdout } = process;

const BOX = {
    TOP_LEFT_CORNER: chalk.bgGrey('\u250C'),
    TOP_RIGHT_CORNER: '\u2510',
    BOTTOM_LEFT_CORNER: '\u2514',
    BOTTOM_RIGHT_CORNER: '\u2518',
    HORIZONTAL_LINE: '\u2500',
    VERTICAL_LINE: '\u2502',
};

const g = chalk.bgGreen(' ')
const w = chalk.blue('\u2592')
const r = chalk.bgGrey.yellow('\u2504')
const t = chalk.bgGrey.black('\u2594')
const b = chalk.bgGrey.black('\u2581')

const edenChar = 'D';
//const edenChar = emoji.get('cat')
let map =
    [[g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t],
    [r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r],
    [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, w, w]
    ]
// ==================== CLI ====================
//const { columns, rows } = stdout;
let columns = 50
let rows = 20;

const cursorTo = (row = 1, column = 1) => stdout.cursorTo(column - 1, row - 1);
const moveCursor = (h, v) => stdout.moveCursor(h, v);
const clearScreen = () => stdout.write('\x1b[2J');
const showCursor = () => stdout.write('\x1b[?25h');
const hideCursor = () => stdout.write('\x1b[?25l');
//const screenSize = () => stdout.write('\x1b[8;99999;99999t')
//const resizeWindow = () => console.log('\x1b[4;40;100t');
const output = data => stdout.write(data);
// screenSize();
// resizeWindow();

const fillPoint = (r, c, char) => {
    cursorTo(r, c);
    output(char);
};

const clearPoints = (a, b) => fillPoint(a, b, ' ');

const fillPointMap = (r, c, char) => {
    cursorTo(r + 2, c + 2);
    output(char);
};

const clearPointsMap = (a, b) => fillPointMap(a, b, ' ');

const edenLocation = [10, 10];

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
const drawMap = (map) => {

    for (let x = 0; x < map.length; x++) {
        for (let i = 0; i < map[0].length; i++) {
            fillPointMap(x, i, map[x][i])
        }
    }
}

const drawActions = () => {
    cursorTo(17, 56);
    output('[^]')
    cursorTo(18, 53);
    output('[<][V][>]')
    cursorTo(19, 52)
    output('Move Using ')
    cursorTo(20, 52)
    output('Arrow Keys')
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
            fillPointMap(...edenLocation, map[edenLocation[0]][edenLocation[1]])
            if (edenLocation[0] > 0) {
                edenLocation[0]--
            }
            fillPointMap(...edenLocation, edenChar)
            break;
        case 'right':
            fillPointMap(...edenLocation, map[edenLocation[0]][edenLocation[1]])
            if (edenLocation[1] < map[0].length - 1) {
                edenLocation[1]++
            }
            fillPointMap(...edenLocation, edenChar)
            break;
        case 'down':
            fillPointMap(...edenLocation, map[edenLocation[0]][edenLocation[1]])
            if (edenLocation[0] < map.length - 1) {
                edenLocation[0]++
            }
            fillPointMap(...edenLocation, edenChar)
            break;
        case 'left':
            fillPointMap(...edenLocation, map[edenLocation[0]][edenLocation[1]])
            if (edenLocation[1] > 0) {
                edenLocation[1]--
            }
            fillPointMap(...edenLocation, edenChar)
            break
    }
});







// ==================== MAIN THREAD ====================

emitKeypressEvents(stdin);
stdin.setRawMode(true);
stdin.setEncoding('utf8');

hideCursor();

console.log(rows, ' ', columns)
console.log('12')
console.log('🐕'.length)
drawBoard();
drawMap(map);
fillPointMap(...edenLocation, edenChar)
drawActions();
//drawDog();

//let play = true;
//while (play === true) {

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

