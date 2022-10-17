import chalk from 'chalk';
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
const edenLocation = [10, 10];

const mapObjects = [
    {
        name: "grass",
        icon: [g],
        actions: ['smell', 'bark', 'play']
    },
    {
        name: "road",
        icon: [r, t, b],
        actions: ['smell', 'bark', 'run away']
    }
]


const map =
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

const columns = 50
const rows = 20;

export const cursorTo = (row = 1, column = 1) => stdout.cursorTo(column - 1, row - 1);
export const moveCursor = (h, v) => stdout.moveCursor(h, v);
export const clearScreen = () => stdout.write('\x1b[2J');
export const showCursor = () => stdout.write('\x1b[?25h');
export const hideCursor = () => stdout.write('\x1b[?25l');
export const output = data => stdout.write(data);

export const fillPoint = (r, c, char) => {
    cursorTo(r, c);
    output(char);
};

export const clearPoints = (a, b) => fillPoint(a, b, ' ');

export const fillPointMap = (r, c, char) => {
    cursorTo(r + 2, c + 2);
    output(char);
};

export const clearPointsMap = (a, b) => fillPointMap(a, b, ' ');

export const drawDog = () => {
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
export const drawMap = () => {

    for (let x = 0; x < map.length; x++) {
        for (let i = 0; i < map[0].length; i++) {
            fillPointMap(x, i, map[x][i])
        }
    }
}

export const initGame = () => {
    drawBoard();
    drawMap();
    drawActions();
    fillPointMap(...edenLocation, edenChar)
}
export const drawActions = () => {
    cursorTo(17, 56);
    output('[^]')
    cursorTo(18, 53);
    output('[<][V][>]')
    cursorTo(19, 52)
    output('Move Using ')
    cursorTo(20, 52)
    output('Arrow Keys')
}

export const drawBoard = () => {
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

export const moveUp = () => {
    fillPointMap(...edenLocation, map[edenLocation[0]][edenLocation[1]])
    if (edenLocation[0] > 0) {
        edenLocation[0]--
    }
    fillPointMap(...edenLocation, edenChar)

}

export const moveRight = () => {
    fillPointMap(...edenLocation, map[edenLocation[0]][edenLocation[1]])
    if (edenLocation[1] < map[0].length - 1) {
        edenLocation[1]++
    }
    fillPointMap(...edenLocation, edenChar)

}

export const moveDown = () => {
    fillPointMap(...edenLocation, map[edenLocation[0]][edenLocation[1]])
    if (edenLocation[0] < map.length - 1) {
        edenLocation[0]++
    }
    fillPointMap(...edenLocation, edenChar)

}

export const moveLeft = () => {
    fillPointMap(...edenLocation, map[edenLocation[0]][edenLocation[1]])
    if (edenLocation[1] > 0) {
        edenLocation[1]--
    }
    fillPointMap(...edenLocation, edenChar)

}

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
