// import { response } from 'express'
// import supertest from 'supertest' 
// import app from '../app.js'    



const {Client} = require('pg')   

const set_database = require('./setup_database') 

set_database

const soicalMedia = require('../constructor/chitter')   


describe('connecting to test database', async() => {
    test('in application', async() => {
        Media = new soicalMedia   
        expect( await Media.start() ).toBe(true)
    })
})


describe('peeps', async() => {

    // work on this area later
    test('Out put all Peeps inside the database', async() =>{
        Media = new soicalMedia  
        await Media.connect()    

        const test = new Client({
            "port": 5432, 
            "database": "chitter_js_test"
        }); 

        let client = test 
        await client.connect() 
        await client.query('INSERT INTO chitter_messages (user_id, message, created_on, chitter_profile) VALUES(DEFAULT, $1, current_timestamp, $2)', ['This is my first message in JS', 1]) 
        await client.query('INSERT INTO chitter_messages (user_id, message, created_on, chitter_profile) VALUES(DEFAULT, $1, current_timestamp, $2)', ['Working with express this time', 2]) 
        await client.query('INSERT INTO chitter_messages (user_id, message, created_on, chitter_profile) VALUES(DEFAULT, $1, current_timestamp, $2)', ['Working out how to use SQL in JS', 3])

        const result = await Media.allChitter()  
        expect( result.map((item) => (item.message))).toEqual(['This is my first message in JS', 'Working with express this time', 'Working out how to use SQL in JS']) 
    })  

    test('rase an err if an object gets passest though the funaction', async() => {
        Media = new soicalMedia 
        try {
            await Media.allChitter()
        } catch(e) {
            expect(e).toBe([])
        }
    })

    test('adding a new peep to Chitter', async() => {
        Media = new soicalMedia 
        await Media.newChitter('Testing my app with Jest and Jasmine', 4)  
        const result = await Media.allChitter()
        expect( result.map((item) => (item.message))).toEqual(["This is my first message in JS", "Working with express this time", "Working out how to use SQL in JS", "Testing my app with Jest and Jasmine"]) 
    }) 

    test('deleting peep from chitter', async() => {
        Media = new soicalMedia 
        await Media.deleteChitter(1) 
        const result = await Media.allChitter() 
        expect( result.map((item) => (item.message))).toEqual(["Working with express this time", "Working out how to use SQL in JS", "Testing my app with Jest and Jasmine"])
    }) 

    // test('rase an error create new peep when id is missing', async() => {  

    //     Media = new soicalMedia 
    //     await expect(Media.allChitter()).resolves.toEqual([])

    // }) 

    test('raise error if chitter delete has the wrong input', async() => {
        Media = new soicalMedia  
        expect(await Media.deleteChitter('')).toBe(false)
    }) 

    test('raise error if you chitter has the wrong input', async() => { 
        Media = new soicalMedia
        expect( await Media.newChitter(null, '')).toBe(false) 
    })

})

describe('Chitter login and logging to profile', async() => {

    test('Should create a new user profile', async() => {
        Media = new soicalMedia 
        await Media.new_chitter_account('Jo_heart', 'Jo_heart@gmail.com', '123Build*')
        await Media.new_chitter_account('Tom_scott', 'Tome_scote@gmail.com', 'happy_me_123') 
        await Media.new_chitter_account('you_found', 'me@gmail.com', 'well_done_123')  

        const test = new Client({
            "port": 5432, 
            "database": "chitter_js_test"
        });    

        await test.connect()  
        let client = test

        const result = await client.query('SELECT * FROM chitter_profile;')  


        const chitter_accounts = result.rows.map((item) => ( {profile_id: item.profile_id, name: item.name, email: item.email, password: item.password} ))      

        expect(chitter_accounts.map((item) => item.name)).toEqual(['Jo_heart', 'Tom_scott', 'you_found'])
        expect(chitter_accounts.map((item) => item.email)).toEqual(['Jo_heart@gmail.com', 'Tome_scote@gmail.com', 'me@gmail.com'])
        expect(chitter_accounts.map((item) => item.password)).toEqual(['123Build*', 'happy_me_123', 'well_done_123'])
    }) 

    test('rase error if chitter input is wrong', async() => {
        Media = new soicalMedia  
        expect(await Media.new_chitter_account(null, null, null)).toBe(false)
        
    })

    test('error will appear if another user has the same name', async() => {
        Media = new soicalMedia 
        expect(await Media.new_chitter_account('Jo_heart', 'Jo_Smith@gmail.com', '123Build*')).toEqual('error')
    }) 

    test('error will appear if another user has the same email', async() => {
        Media = new soicalMedia  
        expect(await Media.new_chitter_account('Smith', 'Jo_heart@gmail.com', '123Build*')).toEqual('error')
    })  

    test('Logging into Chitter app', async() => {
        Media = new soicalMedia  
        const result = await Media.logging_in('Jo_heart', '123Build*')   
        let Login_result = result.rows.map((item) => item.profile_id)
        expect(Login_result).toEqual([1])
    })   

    test('unidetifyed user login', async() => {
        Media = new soicalMedia  
        expect(await Media.logging_in('not_me', '123Build*')).toEqual('error')
        expect(await Media.logging_in('Jo_heart', '123')).toEqual('error')
    })   

    test('rasing logging error', async() => {
        try{ 
            Media = new soicalMedia  
            await Media.logging_in(null, null)
        } catch(e) {
            expect(e).toBe(false)
        }
        
    }) 

    describe('should send an email to the user', async() => {
        test('check for a user in the peep', async() => {
            Media = new soicalMedia 
            let peep = '@Cat hello world'
            const result = await Media.email(peep) 
            console.log(result)
        })
    })

})

    //npm test --detectOpenHandles



