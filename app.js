const soicalMedia = require('./constructor/chitter')     

// this reads the files 
var fs = require('fs') 

let Media = new soicalMedia    

const express = require('express')   
var session = require('express-session') 

const { render } = require('ejs')
const app = express()  
app.use(express.json())
app.use(express.static(__dirname + '/public')); 
// register view engine
app.set('view engine', 'ejs');  
// app.use(express.urlencoded({ extrended: false }));  
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'secret-key', 
    resave: false, 
    saveUninitialized: false,
})); 
app.use(express.static('public'));  


app.get('/', function (req, res) { 
    res.render('login', {error: ''})
}) 

// User logging
app.post('/logging_in', async function(res, req) { 
   const result = await Media.logging_in(res.body.username, res.body.password)   
    if (result === 'error') { 
        req.render('login', { error: 'Username or Password is incorrect'})
    } else { 
        session.id = result.rows[0].profile_id
        req.redirect('/all_peep')
    }
})

// get the main page  
app.get('/all_Peep', async function(req, res){   
    // here is where I can but the sessions id for now:)
    const result = await Media.allChitter() 
    // to add to 
    res.render('index', {result: result, profile_id: session.id })
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
            await Media.newChitter(peep, session.id)   
            // await Media.email(peep)  
            // here is where the ppep should go into emails 
            console.log('adding new peep')
            req.redirect('/all_Peep')
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
        req.redirect('/all_Peep')
    } 
    catch(e) {
        console.log(e)
    }
}) 



app.get('/sign_up', function(req, res) {
    res.render('sign_up', {error: ''})
}) 

app.post('/save_account', async function(req, res) {
    try {   
        // look at this later
        console.log(req.body.name.indexOf(' ')) 

        if (req.body.name.indexOf(' ') < 0 && req.body.name.length !== 0 || req.body.email.length !== 0 || req.body.password.length !== 0) {
        let result = await Media.new_chitter_account(req.body.name, req.body.email, req.body.password)    

            if (result === 'error') {
                res.render('sign_up', {error: 'Sorry this name or password has been used'})
            } else {
                res.redirect('/')
            }

        } else if (req.body.name.length !== 0 || req.body.email.length !== 0 || req.body.password.length !== 0) {
            res.render('sign_up', {error: 'Sorry, the Username cannot have spaces.'})
        } else {
            res.render('sign_up', {error: 'Use must fill in the name, email and password'})
        }
        
        
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