import chalk from 'chalk';

export const BOX = {
    TOP_LEFT_CORNER: '\u250C',
    TOP_RIGHT_CORNER: '\u2510',
    BOTTOM_LEFT_CORNER: '\u2514',
    BOTTOM_RIGHT_CORNER: '\u2518',
    HORIZONTAL_LINE: '\u2500',
    VERTICAL_LINE: '\u2502',
};

const g = chalk.bgGreen(' ') //grass
const w = chalk.blue('\u2592')//water
const r = chalk.bgGrey.yellow('\u2504')//road midline
const t = chalk.bgGrey.black('\u2594')//road top
const b = chalk.bgGrey.black('\u2581')//road bottom
const h = chalk.bgYellow('\u2591')// home
const f = chalk.bgMagenta(' ')//house floor
const q = '\u2588'// wall
const n = ' '// no man's land
const d = chalk.red('\u2593')//door mat inside
const m = chalk.blue('\u2593')//door mat outside
const ctl = chalk.bgMagenta('\u256d')//dog bed
const ctr = chalk.bgMagenta('\u256e')
const cbr = chalk.bgMagenta('\u256f')
const cbl = chalk.bgMagenta('\u2570')

export const mapObjects = [
    {
        name: "grass",
        icon: [g],
        actions: ['smell', 'pee', 'bark', 'play']
    },
    {
        name: "road",
        icon: [r, t, b],
        actions: ['smell', 'bark', 'run away']
    },

    {
        name: "water",
        icon: [w],
        actions: ['drink', 'bark', 'swim']
    },

    {
        name: "home",
        icon: [h],
        actions: ['smell', 'bark', 'eat', 'pee']
    },

    {
        name: "wall",
        icon: [q],
        actions: ['crash']
    },

    {
        name: "door mat",
        icon: [d],
        actions: ['go outside']
    },
    {
        name: "door mat outside",
        icon: [m],
        actions: ['go inside']
    },
    {
        name: "house floor",
        icon: [f],
        actions: ['smell', 'bark']
    },
    {
        name: "blank",
        icon: [n],
        actions: []
    },
    {
        name: "dog bed",
        icon: [ctl, ctr, cbr, cbl],
        actions: ['sleep']
    },


]

export const ball1loc = { map: 0, x: 32, y: 13 }
export const ball2loc = { map: 1, x: 34, y: 17 }

export let myGreyhound = {
    icon: '?',
    name: 'Temp',
    loc: { map: 0, x: 20, y: 5 },
    CurStamina: 100,
    maxStamina: 100,
    hunger: 0,
    thirsty: 0,
    bladder: 0,
    experience: 0,
    level: 1,
    online: false,
    lastOnline: 0,
    ball1: false,
    ball2: false
}

export const templateObj = {
    icon: '',
    name: '',
    loc: { map: 0, x: 20, y: 5 },
    CurStamina: 100,
    maxStamina: 100,
    hunger: 0,
    thirsty: 0,
    bladder: 0,
    experience: 0,
    level: 1,
    online: false,
    lastOnline: 0,
    ball1: false,
    ball2: false
}
export const npObjects = [
    {
        icon: 'p',
        name: "puppy",
        loc: { map: 1, x: 10, y: 15 },
        actions: ['smell', 'bark', 'play']

    },

    {
        icon: chalk.bgGrey('C'),
        name: "Moving Car",
        loc: { map: 1, x: 1, y: 8 },
        actions: ['run away', 'freeze']

    },

    {
        icon: 'C',
        name: "Moving Car 2",
        loc: { map: 1, x: 47, y: 10 },
        actions: ['run away', 'freeze']

    }

]



export let currentMap =
    [[g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, h, h, h, h, h, h, h, h, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, h, h, h, h, h, h, h, h, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, h, h, h, h, h, h, h, h, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, h, h, h, h, h, h, h, h, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t],
    [r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r],
    [b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, w, w]
    ]

export const map1 =
    [[g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, m, m, m, m, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g],
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
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, w],
    [g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, w, w, w, w, w, w, w, w, w]
    ]
export const map0 =
    [[n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, ctl, ctr, h, h, h, h, h, h, h, h, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, cbl, cbr, h, h, h, h, h, h, h, h, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, h, h, h, h, h, h, h, h, h, h, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, h, h, h, h, h, h, h, h, h, h, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, q, q, q, q, q, q, q, h, h, q, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, q, q, q, q, q, q, q, h, h, q, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, h, h, h, h, h, h, h, h, h, h, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, h, h, h, h, h, h, h, h, h, h, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, q, h, h, h, h, h, h, h, h, h, h, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, h, h, h, h, h, h, h, h, h, h, d, d, d, d, d, h, h, q, h, h, h, h, h, h, h, h, h, h, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n]
    ]

export let mapArr = [map0, map1];


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


// export const drawDog = () => {
//     let edenImage = [
//         '            /)-_-(\\        /)-_-(\\',
//         "             (o o)          (o o)'",
//         '     .-----__/\\o/            \\o/\\__-----.',
//         '    /  __      /              \\      __  \\',
//         '\\__/\\ /  \\_\\ |/                \\| /_/  \\ /\\__/',
//         '     \\\\     ||                  ||      \\\\',
//         '     //     ||                  ||      //',
//         '     |\\     |\\                  /|     /|']

//     for (let x = 2; x <= edenImage.length + 1; x++) {
//         cursorTo(x, 2)
//         output(edenImage[x - 2])
//     }
// }