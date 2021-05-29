// import { response } from 'express'
// import supertest from 'supertest' 
// import app from '../app.js' 
const soicalMedia = require('../constructor/chitter')  



    test('should out put all Peeps', async() => {
        Media = new soicalMedia  
        console.log(await Media.allChitter()) 
       
    
        // expect( Media.allChitter()).toEqual({})
    }, 30000); 

 



