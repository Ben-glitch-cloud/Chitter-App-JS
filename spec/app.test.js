// import { response } from 'express'
// import supertest from 'supertest' 
// import app from '../app.js'



const {Client} = require('pg')

const client = new Client({
    "port": 5432, 
    "database": "chitter_js_test", 
    
})     

async function start() {
    await connect()
}

async function connect() {
    try {
        await client.connect()
    } 
    catch {
        console.log(`Failed to connect ${e}`)
    }
}  

start() 

async function allChitter() {  
    try {
        const results = await client.query("SELECT * FROM chitter_messages;") 
        return results.rows.map((item) => ( {message_id: item.user_id, message: item.message, message_time: item.created_on} )); 
    }
    catch(e) {
        return []; 
    }

}  

describe('connect to datebase', () => {
    test('and return an object', () => {
       
    })
})

