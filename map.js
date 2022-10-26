import { messagePost, updateOnline } from './client.js';
import { BOX, myGreyhound, npObjects, currentMap, mapArr, mapObjects } from './cont.js';
import { locCompare, printCurrentActions } from './event.js';
import { calcDistance } from './index.js';
import chalk from 'chalk';
import readlineSync from 'readline-Sync'
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

export const drawMap = () => {
    Object.assign(currentMap, mapArr[myGreyhound.loc.map])
    for (let x = 0; x < currentMap.length; x++) {
        for (let i = 0; i < currentMap[0].length; i++) {
            fillPointMap(x, i, currentMap[x][i])
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

        fillPointMap(npObjects[x].loc.y, npObjects[x].loc.x, currentMap[npObjects[x].loc.y][npObjects[x].loc.x])
        //todo update NP object new location
        if (npObjects[x].loc.map === myGreyhound.loc.map) {
            fillPointMap(npObjects[x].loc.y, npObjects[x].loc.x, npObjects[x].icon)
        }
    }
}

let rest = false;
const tired = () => {
    if (myGreyhound.CurStamina <= 0 && rest === false) {
        rest = true
        printMessage("I'm tired, lets take a break")
        setTimeout(() => {
            myGreyhound.CurStamina += 10;
            updateStats()
            rest = false;
        }, 2000);
    }
}

export const collision = (dir) => {
    let col = false;
    switch (dir) {
        case 'up':
            for (const npObject of npObjects) {

                if (myGreyhound.loc.y - 1 === npObject.loc.y && myGreyhound.loc.x === npObject.loc.x) {
                    col = true
                }
            }
            for (const online of lastOnline) {
                if (myGreyhound.loc.y - 1 === online.loc.y && myGreyhound.loc.x === online.loc.x) {
                    col = true
                }
            }
            //warning might break if wall is not mapObject[4]
            if (mapObjects[4].icon.some((i) => i === currentMap[myGreyhound.loc.y - 1][myGreyhound.loc.x])) {
                col = true
            }
            break;
        case 'down':
            for (const npObject of npObjects) {
                if (myGreyhound.loc.y + 1 === npObject.loc.y && myGreyhound.loc.x === npObject.loc.x) {
                    col = true
                }
            }
            for (const online of lastOnline) {
                if (myGreyhound.loc.y + 1 === online.loc.y && myGreyhound.loc.x === online.loc.x) {
                    col = true
                }
            }
            if (mapObjects[4].icon.some((i) => i === currentMap[myGreyhound.loc.y + 1][myGreyhound.loc.x])) {
                col = true
            }
            break;
        case 'left':
            for (const npObject of npObjects) {
                if (myGreyhound.loc.y === npObject.loc.y && myGreyhound.loc.x - 1 === npObject.loc.x) {
                    col = true
                }
            }
            for (const online of lastOnline) {
                if (myGreyhound.loc.y === online.loc.y && myGreyhound.loc.x - 1 === online.loc.x) {
                    col = true
                }
            }
            if (mapObjects[4].icon.some((i) => i === currentMap[myGreyhound.loc.y][myGreyhound.loc.x - 1])) {
                col = true
            }
            break;
        case 'right':
            for (const npObject of npObjects) {
                //console.log(`Ex= ${myGreyhound.loc.x}, name: ${npObject.name}, x=${npObject.loc.x}`)
                if (myGreyhound.loc.y === npObject.loc.y && myGreyhound.loc.x + 1 === npObject.loc.x) {
                    col = true
                }

            }
            for (const online of lastOnline) {
                if (myGreyhound.loc.y === online.loc.y && myGreyhound.loc.x + 1 === online.loc.x) {
                    col = true
                }
            }
            if (mapObjects[4].icon.some((i) => i === currentMap[myGreyhound.loc.y][myGreyhound.loc.x + 1])) {
                col = true
            }
            break;
        default:
            break;
    }

    return col
}

export const moveUp = () => {

    tired()


    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, currentMap[myGreyhound.loc.y][myGreyhound.loc.x])
    if (myGreyhound.loc.y > 0 && rest === false && collision('up') === false) {
        myGreyhound.loc.y--;
        draindown();
    }
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, myGreyhound.icon)

}

export const moveRight = () => {
    tired()

    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, currentMap[myGreyhound.loc.y][myGreyhound.loc.x])
    if (myGreyhound.loc.x < currentMap[0].length - 1 && rest === false && collision('right') === false) {
        myGreyhound.loc.x++
        draindown();
    }
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, myGreyhound.icon)
}

export const moveDown = () => {
    tired()

    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, currentMap[myGreyhound.loc.y][myGreyhound.loc.x])
    if (myGreyhound.loc.y < currentMap.length - 1 && rest === false && collision('down') === false) {
        myGreyhound.loc.y++
        draindown();
    }
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, myGreyhound.icon)

}

export const moveLeft = () => {
    tired()

    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, currentMap[myGreyhound.loc.y][myGreyhound.loc.x])
    if (myGreyhound.loc.x > 0 && rest === false && collision('left') === false) {
        myGreyhound.loc.x--
        draindown();
    }
    fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, myGreyhound.icon)

}

//update stat display
export const updateStats = () => {
    cursorTo(21, 2)
    output(`Name: ${chalk.green(myGreyhound.name)} | Hunger: ${Math.floor(myGreyhound.hunger)} % | Thirty: ${Math.floor(myGreyhound.thirsty)} % `)
    cursorTo(22, 2)
    output(`Stamina: ${Math.floor(myGreyhound.CurStamina)} / ${myGreyhound.maxStamina} | Exp Points: ${myGreyhound.experience} | Level: ${myGreyhound.level} lvl`)
}

//changes stats on movement
export const draindown = () => {
    ///To-Do need to add if statement limits
    if (myGreyhound.CurStamina > 0) { myGreyhound.CurStamina -= 0.5; }
    if (myGreyhound.hunger < 100) myGreyhound.hunger = myGreyhound.hunger + 1;
    if (myGreyhound.thirsty < 100) myGreyhound.thirsty = myGreyhound.thirsty + 0.75
    if (myGreyhound.thirsty < 100 && myGreyhound.bladder < 100) myGreyhound.bladder += 0.5
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


let lastOnline = [];

export const messagePlayers = () => {
    const canMessage = [];

    for (let online of lastOnline) {
        const dist = calcDistance(online.loc.x, myGreyhound.loc.x, online.loc.y, myGreyhound.loc.y)
        if (dist < 2 && online.loc.map === myGreyhound.loc.map) {
            online.sender = myGreyhound.name
            online.message = `Woof... from ${myGreyhound.name}`
            canMessage.push(online)
        }
    }
    if (canMessage.length > 0) {
        messagePost(canMessage)
    }

}
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
    lastOnline.forEach(element => { fillPointMap(element.loc.y, element.loc.x, currentMap[element.loc.y][element.loc.x]) })
    lastOnline = []
    if (data !== 'empty') {
        lastOnline = JSON.parse(data);
        lastOnline.forEach(element => {
            if (element.loc.map === myGreyhound.loc.map)
                fillPointMap(element.loc.y, element.loc.x, element.icon)
        })
    }

}