const jsdom = require('jsdom')

// setup the simplest document possible
const exposedProperties = ['window', 'navigator', 'document'];


const {JSDOM} = jsdom;

const {document} = new JSDOM('').window;
global.document = document;
// global.document =jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if(typeof global[property] === 'undefined'){
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
})

global.navigator = {
    userAgent: 'node.js'
}


