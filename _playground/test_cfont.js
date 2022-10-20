import cfonts from 'cfonts';

cfonts.say('Hello|world!', {
    font: 'chrome',              // define the font face
    align: 'center',              // define text alignment
    colors: ['#C90076', '#FFA500', '#C90076'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many character can be on one line
    gradient: true,            // define your two gradient colors
    independentGradient: true, // define if you want to recalculate the gradient for each new line
    transitionGradient: false,  // define if this is a transition between colors directly
    env: 'node'                 // define the environment cfonts is being executed in
});