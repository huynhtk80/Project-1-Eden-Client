import { saveGreyhoundPut } from "./client.js";
import { cursorTo, drawMap, fillPointMap, output, populateNP, printMessage, printMessage2, updateStats } from "./map.js"
import { mapObjects, myGreyhound, currentMap, ball1loc, ball2loc } from './cont.js'
import { calcDistance } from "./index.js";

let currentLocationName = '';
let lastLocationName = 'unknown';

export const locCompare = () => {
    mapObjects.forEach(element => {
        if (element.icon.some((i) => i === currentMap[myGreyhound.loc.y][myGreyhound.loc.x])) {
            currentLocationName = element.name;
        }

    });
}

export const printCurrentActions = () => {
    clearCurrentActions()
    if (currentLocationName === lastLocationName) {
        console.log('do nothing')
    }
    let index = mapObjects.findIndex((n) => n.name === currentLocationName)
    cursorTo(2, 51)
    output(currentLocationName)
    for (let y = 0; y < mapObjects[index].actions.length; y++) {
        cursorTo(4 + y * 2, 51)
        output(`[${y + 1}]`)
        cursorTo(4 + y * 2, 54)
        output(mapObjects[index].actions[y])
    }
}

const clearCurrentActions = () => {

    for (let y = 0; y < 10; y++) {
        cursorTo(2 + y, 51)
        output('               ')
    }
}

export const doCurrentAction = (keyp) => {

    let index = mapObjects.findIndex((n) => n.name === currentLocationName)
    if (keyp <= mapObjects[index].actions.length) {
        let keyedCurrentAction = mapObjects[index].actions[keyp - 1]

        switch (keyedCurrentAction) {
            case 'smell':
                smell();
                break;
            case 'drink':
                drink()
                break;
            case 'bark':
                bark();
                break;
            case 'run away':
                printMessage(`action run away`)
                break;
            case 'pee':
                pee()
                break;
            case 'sleep':
                sleep();
                break;
            case 'play':
                printMessage(`action play`)
                break;
            case 'swim':
                swim();
                break;
            case 'eat':
                eat();
                break;
            case 'go outside':
                gotomap(1);
                break;
            case 'go inside':
                gotomap(0);
                break;
            default:
                break;
        }
    }
}

const gotomap = (map) => {
    if (map === 1 && myGreyhound.ball1 === true || map === 0 && myGreyhound.ball2 === true) {
        myGreyhound.loc.map = map
        if (map === 1) {
            myGreyhound.loc.y = 2;
            myGreyhound.loc.x = 15;
        } else if (map === 0) {
            myGreyhound.loc.y = 14;
            myGreyhound.loc.x = 16;
        }

        drawMap();
        fillPointMap(myGreyhound.loc.y, myGreyhound.loc.x, myGreyhound.icon)
        updateStats();
        locCompare();
        printCurrentActions();
        populateNP()
    } else {
        printMessage("you need to find your ball first")
    }
}
const expUp = (num) => {
    myGreyhound.experience += num;

    if (myGreyhound.experience > 20 && myGreyhound.level === 1) {
        myGreyhound.level++;
        myGreyhound.maxStamina += 20;
        myGreyhound.CurStamina = myGreyhound.maxStamina
        printMessage('Your Greyhound Leveled Up')
    }
    if (myGreyhound.experience > 50 && myGreyhound.level === 2) {
        myGreyhound.level++;
        myGreyhound.maxStamina += 30;
        myGreyhound.CurStamina = myGreyhound.maxStamina
        printMessage('Your Greyhound Leveled Up')
    }
    if (myGreyhound.experience > 100 && myGreyhound.level === 3) {
        myGreyhound.level++;
        myGreyhound.maxStamina += 50;
        myGreyhound.CurStamina = myGreyhound.maxStamina
        printMessage('Your Greyhound Leveled Up')
    }

}
const smell = () => {

    switch (currentLocationName) {
        case 'grass':
            printMessage('Something smells sweet...or is it just pee')
            break;
        case 'road':
            printMessage('Something doesn\'t smell natural here...maybe i should go')
            break;
        case 'home':
            printMessage('Is that food???')
            break;
        case 'peed home':

            break;
        default:
            break;
    }
    if (myGreyhound.ball1 === false && myGreyhound.loc.map === 0) {
        const balldis1 = calcDistance(myGreyhound.loc.x, ball1loc.x, myGreyhound.loc.y, ball1loc.y)
        if (balldis1 > 5) {
            printMessage2('Can\'t smell the ball!')
        } else if (balldis1 > 3) {
            printMessage2('The ball is close')
        } else if (balldis1 >= 2) {
            printMessage2('The ball is really close!')
        } else if (balldis1 == 1) {
            printMessage2('its EXTREMELY close!')
        } else if (balldis1 === 0) {
            expUp(25);
            printMessage2('you found the ball!!')
            myGreyhound.ball1 = true;

        }
    }

    if (myGreyhound.ball2 === false && myGreyhound.loc.map === 1) {
        const balldis2 = calcDistance(myGreyhound.loc.x, ball2loc.x, myGreyhound.loc.y, ball2loc.y)
        if (balldis2 > 7) {
            printMessage2('Can\'t smell the ball!')
        } else if (balldis2 > 4) {
            printMessage2('the ball is close')
        } else if (balldis2 > 2) {
            printMessage2('its really close!')
        } else if (balldis2 >= 1) {
            printMessage2('its EXTREMELY close!')
        }
        else if (balldis2 === 0) {
            expUp(50)
            printMessage2('you found the ball!!')
            myGreyhound.ball2 = true;

        }
    }
}

const eat = () => {

    switch (currentLocationName) {
        case 'grass':
            printMessage('Ate some grass... it was ok!')
            myGreyhound.hunger = myGreyhound.hunger - 2
            break
        case 'road':
            printMessage('YUKK..what is this black stuff?')
            break;
        case 'home':
            if (myGreyhound.hunger > -100) {
                myGreyhound.hunger = myGreyhound.hunger - 25
            }
            printMessage('Wow this is Amazing!!! why was it so high up?')

            if (myGreyhound.hunger <= -100) {
                printMessage2('ARRGGG...this is bad!! maybe I should just lye down')
                myGreyhound.CurStamina = 0;
            }
            else if (myGreyhound.hunger < -50) {
                printMessage2('ARRGGG... Maybe I should stop eatting!')

            } else if (myGreyhound.hunger < -25) {
                printMessage2('why does my tummy hurt? Maybe I will eat more!')
            }
            break;
        case 'home bowl':
            myGreyhound.hunger = 0;

            break;
        default:
            break;
    }
}

const pee = () => {
    if (myGreyhound.bladder > 25) {
        myGreyhound.bladder = 0;
        switch (currentLocationName) {
            case 'grass':
                printMessage('Ahhh....Now this spot is mine!!')
                expUp(10)
                break
            case 'road':
                printMessage('Ahhh... it\'s running onto my paws...oh wells')
                expUp(5)
                break;
            case 'home':
                printMessage('Ahhh... relief... but somehow something feels wrong')
                expUp(-5)
                break;
            default:
                break;
        }
    } else { printMessage('looks like i don\'t need to pee') }
}

const swim = () => {

    printMessage('HELP!! HELP, I can\'t swim!!')

}

const drink = () => {
    if (myGreyhound.bladder < 100 && myGreyhound.thirsty === 0) {
        myGreyhound.bladder += 10
    }
    if (myGreyhound.thirsty > 25) { expUp(5) }
    myGreyhound.thirsty = 0;

    printMessage('Lap Lap Lap')

}

const sleep = async () => {
    myGreyhound.CurStamina = myGreyhound.maxStamina;
    printMessage('Zzz..Zzzz...Zzz...')
    printMessage2('Your Progress is being saved....')
    let data = await saveGreyhoundPut();

    printMessage2(data)
}

const bark = () => {
    if (myGreyhound.level === 1) {
        printMessage(`Too shy to bark`)
    }
    if (myGreyhound.level === 2) {
        printMessage(`ruf....that was barely a bark`)
    }
    if (myGreyhound.level === 3) {
        printMessage(`HOwlll.....`)
    }
}