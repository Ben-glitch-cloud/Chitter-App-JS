// import { response } from 'express'
// import supertest from 'supertest' 
// import app from '../app.js'   

const set_database = require('./setup_database') 

set_database

const soicalMedia = require('../constructor/chitter')  

describe('test peeps on Chitter', async() => {

    test('Out putting all Peep inside the database', async() =>{
        Media = new soicalMedia  
        await Media.connect() 
        await Media.newChitter('This is my first message in JS', 1) 
        await Media.newChitter('Working with express this time', 2)  
        await Media.newChitter('Working out how to use SQL in JS', 3)   
        const result = await Media.allChitter()
        expect( result.map((item) => (item.message))).toEqual(['This is my first message in JS', 'Working with express this time', 'Working out how to use SQL in JS']) 
    })

    test('adding a new peep to Chitter', async() => {
        Media = new soicalMedia 
        await Media.connect() 
        await Media.newChitter('Testing my app with Jest and Jasmine', 4)  
        const result = await Media.allChitter()
        expect( result.map((item) => (item.message))).toEqual(["This is my first message in JS", "Working with express this time", "Working out how to use SQL in JS", "Testing my app with Jest and Jasmine"]) 
    }) 

    test('deleting peep from chitter', async() => {
        Media = new soicalMedia 
        await Media.connect() 
        await Media.deleteChitter(1) 
        const result = await Media.allChitter() 
        expect( result.map((item) => (item.message))).toEqual(["Working with express this time", "Working out how to use SQL in JS", "Testing my app with Jest and Jasmine"])
    })

}) 

describe('test chitters profile and login', async() => {
    test('Looging in to chitter account', async() => {
        Media = new soicalMedia 
        await Media.connect() 
        await new_chitter_account('Jo_heart', 'Jo_heart@gmail.com', '123Build*')
        await new_chitter_account('Tom_scott', 'Tome_scote@gmail.com', 'happy_me_123') 
        await new_chitter_account('you_found', 'me@gmail.com', 'well_done_123') 
        const result = await client.query('SELECT * FROM chitter_profile;') 
        const chitter_accounts = result.rows.map((item) => ( {profile_id: item.profile_id, name: item.name, email: item.email, password: item.password} ))    
        chitter_accounts
        // work on here tomorrow, this will be interasting 
    })
})

    //npm test --detectOpenHandles



