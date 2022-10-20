import chalk from 'chalk';

console.log(chalk.blue('Hello world!'));
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange color
const testcolour = chalk.bgMagenta.hex('#d4f2e7');
const somethingpink = chalk.hex('#C90076')

console.log(error('Error!'));
console.log(warning('Warning!'));
console.log(testcolour('Test Hex Colour!'))
console.log(somethingpink('Test Hex Colour!'))
let text = " x "
let mon = "   "
let des = '   '
let viewM = true;
let ViewD = false
if (viewM == true)
    mon = "^^^"
console.log(`${mon}|${text}|${des}|
------------
   |   |   |`)