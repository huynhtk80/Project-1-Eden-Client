import { cursorTo, edenObj, map, mapObjects, output } from "./map.js"
let currentLocationName = '';
let lastLocationName = 'unknown';

export const locCompare = () => {
    mapObjects.forEach(element => {
        if (element.icon.some((i) => i === map[edenObj.Location[0]][edenObj.Location[1]])) {
            currentLocationName = element.name;
        }

    });
    // if (mapObjects[0].icon.some((i) => i === map[edenObj.Location[0]][edenObj.Location[1]])) {
    //     currentLocationName = mapObjects[0].name;
    // } else if (mapObjects[1].icon.some((i) => i === map[edenObj.Location[0]][edenObj.Location[1]])) {
    //     currentLocationName = mapObjects[1].name;
    // }

}

export const printCurrentActions = () => {
    cursorTo(26, 2)
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