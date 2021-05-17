const soicalMedia = require('./constructor/chitter')     

// this reads the files 
var fs = require('fs') 

let Media = new soicalMedia    

const express = require('express')  
const { render } = require('ejs')
const app = express()  
app.use(express.json())
app.use(express.static(__dirname + '/public')); 
// register view engine
app.set('view engine', 'ejs');  
// app.use(express.urlencoded({ extrended: false }));  
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));  


// get the main page  
app.get('/', async function(req, res){  
    
    const result = await Media.allChitter()
    res.render('index', {result: result})
}) 

// get the chitter post page
app.get('/newPeep', function(req, res){
    res.render('chitterpost')
})  

app.post('/newchitter', async function(res, req) {   
    try {
        const peep = res.body.peep 
        await Media.newChitter(peep)  
        // It looks like you've swapped req and res in your router.get callback. Thus, what you've named req is actually res, and vice versa, and req.render does not exist.
        req.redirect('/')
    } 
    catch(e) {
        // result.succes = false  
        console.log(e)
    }
}) 

app.get('/deleteChitter/:id', async function(res, req) {
    try { 
        const message_id = res.params.id     
        await Media.deleteChitter(message_id) 
        req.redirect('/')
    } 
    catch(e) {
        console.log(e)
    }
})

// this will be where the new post comes in.  
// app.post('/newchitter', function(req, res){   
    
// })

// get the about page 
app.get('/about', function(req, res){
    res.render('about')
})

// listen for the app 
app.listen(3000, () => {
    console.log('Server is now running')
})  

// 404 page 
app.use((req, res) => {
    res.render('404')
})

// work = new Work 

// console.log(work.HomeWork("Ben")) 

// Run the server 
// node app 