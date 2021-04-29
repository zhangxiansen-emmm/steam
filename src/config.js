const files = require.context('./View',true,/\.js/)
files.keys().map(element => {
        console.log(element)
        
});