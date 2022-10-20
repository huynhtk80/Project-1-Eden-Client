import { cursorTo, edenObj, map, mapObjects, output, printMessage, printMessage2 } from "./map.js"
let currentLocationName = '';
let lastLocationName = 'unknown';

export const locCompare = () => {
    mapObjects.forEach(element => {
        if (element.icon.some((i) => i === map[edenObj.Location[0]][edenObj.Location[1]])) {
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

    for (let y = 0; y < mapObjects[index].actions.length; y++) {
        cursorTo(2 + y * 2, 51)
        output(`[${y + 1}]`)
        cursorTo(2 + y * 2, 54)
        output(mapObjects[index].actions[y])
    }
}

const clearCurrentActions = () => {

    for (let y = 0; y < 10; y++) {
        cursorTo(2 + y, 51)
        output('           ')
    }
}

export const doCurrentAction = (keyp) => {

    let index = mapObjects.findIndex((n) => n.name === currentLocationName)
    printMessage(`Keyp: ${keyp} Index ${index} action l: ${mapObjects[index].actions.length}`)
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
                printMessage(`action bark`)
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
            default:
                break;
        }
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
}

const eat = () => {

    switch (currentLocationName) {
        case 'grass':
            printMessage('Ate some grass... it was ok!')
            edenObj.hunger = edenObj.hunger - 2
            break
        case 'road':
            printMessage('YUKK..what is this black stuff?')
            break;
        case 'home':
            edenObj.hunger = edenObj.hunger - 25
            printMessage('Wow this is Amazing!!! why was it so high up?')
            if (edenObj.hunger < -100) {
                printMessage2('ARRGGG...this is bad!! maybe I should just lye down')
                edenObj.CurStamina = edenObj.CurStamina - 50
            }
            else if (edenObj.hunger < -50) {
                printMessage2('ARRGGG... Maybe I should stop eatting!')

            } else if (edenObj.hunger < -25) {
                printMessage2('why does my tummy hurt? Maybe I will eat more!')
            }
            break;
        case 'home bowl':
            edenObj.hunger = 0;

            break;
        default:
            break;
    }
}

const pee = () => {
    edenObj.bladder = 0;
    switch (currentLocationName) {
        case 'grass':
            printMessage('Ahhh....Now this spot is mine!!')
            edenObj.experience = edenObj.experience + 10;
            break
        case 'road':
            printMessage('Ahhh... it\'s running onto my paws...oh wells')
            break;
        case 'home':
            printMessage('Ahhh... relief... but somehow something feels wrong')
            break;
        case 'home bowl':
            edenObj.hunger = 0;

            break;
        default:
            break;
    }
}

const swim = () => {

    printMessage('HELP!! HELP, I\can\'t swim!!')

}

const drink = () => {
    edenObj.thirsty = 0;
    printMessage('Lap Lap Lap')

}

const sleep = () => {
    edenObj.CurStamina = edenObj.maxStamina;
    printMessage('Zzz..Zzzz...Zzz...')

}
