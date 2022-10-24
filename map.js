import { PORT, updateOnline, URI } from './client.js';
import { BOX, myGreyhound, npObjects, map } from './cont.js';
import { locCompare, printCurrentActions } from './event.js';
const { stdin, stdout } = process;








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

export const drawMap = () => {

    for (let x = 0; x < map.length; x++) {
        for (let i = 0; i < map[0].length; i++) {
            fillPointMap(x, i, map[x][i])
        }
    }
}


export const drawActions = () => {
    cursorTo(16, 56);
    output('[^]')
    cursorTo(17, 53);
    output('[<][V][>]')
    cursorTo(18, 52)
    output('Move Using ')
    cursorTo(19, 52)
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

export const populateNP = () => {
    for (let x = 0; x < npObjects.length; x++) {

        fillPointMap(npObjects[x].locy, npObjects[x].locx, map[npObjects[x].locy][npObjects[x].locx])
        //todo update NP object new location
        fillPointMap(npObjects[x].locy, npObjects[x].locx, npObjects[x].icon)
    }
}


export const moveUp = () => {
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, map[myGreyhound.loc.y][myGreyhound.loc.x])
    if (myGreyhound.loc.y > 0) {
        myGreyhound.loc.y--;
        draindown();
    }
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, myGreyhound.icon)

}

export const moveRight = () => {
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, map[myGreyhound.loc.y][myGreyhound.loc.x])
    if (myGreyhound.loc.x < map[0].length - 1) {
        myGreyhound.loc.x++
        draindown();
    }
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, myGreyhound.icon)

}

export const moveDown = () => {
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, map[myGreyhound.loc.y][myGreyhound.loc.x])
    if (myGreyhound.loc.y < map.length - 1) {
        myGreyhound.loc.y++
        draindown();
    }
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, myGreyhound.icon)

}

export const moveLeft = () => {
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, map[myGreyhound.loc.y][myGreyhound.loc.x])
    if (myGreyhound.loc.x > 0) {
        myGreyhound.loc.x--
        draindown();
    }
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, myGreyhound.icon)

}

export const updateStats = () => {
    cursorTo(21, 2)
    output(`Stamina: ${myGreyhound.CurStamina} / ${myGreyhound.maxStamina} | Hunger: ${Math.floor(myGreyhound.hunger)} % | Thirty: ${Math.floor(myGreyhound.thirsty)} % `)
}

export const draindown = () => {
    ///To Do need to add if statement limits
    myGreyhound.CurStamina--;
    myGreyhound.hunger = myGreyhound.hunger + 0.25;
    myGreyhound.thirsty = myGreyhound.thirsty + 0.75
    myGreyhound.lastOnline = Date.now()
    myGreyhound.online = true;
}

export const printMessage = (mes) => {
    cursorTo(23, 2)
    output("                                                        ")
    cursorTo(23, 2)
    output(mes)
    cursorTo(24, 2)
    output("                                                        ")
}
export const printMessage2 = (mes) => {
    cursorTo(24, 2)
    output("                                                        ")
    cursorTo(24, 2)
    output(mes)
}


export const initGame = () => {
    hideCursor();
    drawBoard();
    drawMap();
    drawActions();
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, myGreyhound.icon)
    updateStats();
    locCompare();
    printCurrentActions();
    populateNP()
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


let lastOnline = [];

export const updateOnlinePlayer = async () => {
    myGreyhound.online = true;
    myGreyhound.lastOnline = Date.now();
    let update = {
        name: myGreyhound.name,
        online: myGreyhound.online,
        lastOnline: myGreyhound.lastOnline,
        loc: myGreyhound.loc
    }

    const data = await updateOnline(update);
    lastOnline.forEach(element => { fillPointMap(element.loc.y, element.loc.x, map[element.loc.y][element.loc.x]) })
    lastOnline = []
    if (data !== 'empty') {
        lastOnline = JSON.parse(data);
        lastOnline.forEach(element => fillPointMap(element.loc.y, element.loc.x, element.icon))
    }

}