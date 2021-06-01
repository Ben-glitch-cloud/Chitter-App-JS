const {Client} = require('pg')    

const test = new Client({
    "port": 5432, 
    "database": "chitter_js_test"
});

function setup() {
    test.connect()  
    test.query('TRUNCATE TABLE chitter_messages RESTART IDENTITY;')
    test.query('TRUNCATE TABLE chitter_profile RESTART IDENTITY;')
} 

module.exports = setup()