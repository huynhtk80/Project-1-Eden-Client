import { emitKeypressEvents } from 'readline';
//import rl from 'readline-sync';

const { stdin, stdout } = process;


stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.stdout.write(`Good Bye`);
        return process.exit(0);
    }

    switch (key.name) {
        case 'up':
            curLocation[0]--;
            console.log(curLocation)
            break;
        case 'right':
            curLocation[1]++;
            console.log(curLocation)
            break;
        case 'down':
            curLocation[0]++
            console.log(curLocation)
            break;
        case 'left':
            curLocation[1]--;
            console.log(curLocation)
            break
    }
});

// ==================== MAIN THREAD ====================

emitKeypressEvents(stdin);
stdin.setRawMode(true);
stdin.setEncoding('utf8');
stdin.resume();

let curLocation = [0, 0]




