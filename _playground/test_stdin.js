//var stdin = process.stdin;
import { emitKeypressEvents } from 'readline';
const { stdin } = process;

emitKeypressEvents(stdin)

// without this, we would only get streams once enter is pressed
stdin.setRawMode(true);

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding('utf8');

// on any data into stdin
stdin.on('keypress', function (key) {
    // ctrl-c ( end of text )
    if (key === '\u0003') {
        process.exit();
    }
    // write the key to stdout all normal like
    process.stdout.write(`Pressed: ${key}`);
});