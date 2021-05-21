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
    // check weather this works?
    res.render('chitterpost', { error: '' })
})   

// reseve new peep from chitter
app.post('/newchitter', async function(res, req) {   
    try {  
        const peep = res.body.peep  
        
        if (peep.length > 0) {
            await Media.newChitter(peep)    
            req.redirect('/')
        } else {  
            console.log('working fine')    
            req.render('chitterpost', { error: 'Make sure to write a peep:)' })
        }
    } 
    catch(e) {
        console.log(e)
    } 
    // It looks like you've swapped req and res in your router.get callback. Thus, what you've named req is actually res, and vice versa, and req.render does not exist.
}) 

// delete Peep
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



app.get('/sign_up', function(req, res) {
    res.render('sign_up')
}) 

app.post('/save_account', async function(req, res) {
    try {
        await Media.new_chitter_account(req.body.name, req.body.email, req.body.password) 
        res.redirect('/')
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