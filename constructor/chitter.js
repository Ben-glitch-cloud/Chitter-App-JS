const {Client} = require('pg')  
const sgMail = require('@sendgrid/mail') 
 

let client;    

const prod = new Client({
    "port": 5432, 
    "database": "chitter_js"
}); 
 

class soicalMedia {     
    

    async start() { 
        const soical = new soicalMedia 
        await soical.connect() 
        return true
    }

    async connect() {
        try {    
            if (process.env.NODE_ENV === 'test') {   
                    console.log('connecting to test_database')    
                    const test = new Client({
                        "port": 5432, 
                        "database": "chitter_js_test"
                    }); 
                    await test.connect()    
                    client = test    
                return true
            } else { 
                    console.log('connecting to database')  
                    await prod.connect()     
                    client = prod   
            } 
        } 
        catch(e) {
            console.log(`Failed to connect ${e}`)  
            console.log('Try restating the web application')
            return false 
        }
    }

    async allChitter() {  
        try {   
            const results = await client.query('SELECT * FROM chitter_messages;')     
            return results.rows.map((item) => ( {message_id: item.user_id, message: item.message, message_time: item.created_on, chitter_id: item.chitter_profile} ))  
        }
        catch(e) {
            return []; 
        }
    }  

    async newChitter(peep, id) {  
        try{ 
            await client.query('INSERT INTO chitter_messages (user_id, message, created_on, chitter_profile) VALUES(DEFAULT, $1, current_timestamp, $2)', [peep, id])    
            await Media.email(peep, id) 
            return true
        }
        catch(e) { 
            // console.log(e)
            return false 
        }
    }  

    async deleteChitter(id) { 
        // change this to be more like the postgres up top. 
        try{  
            await client.query('DELETE FROM chitter_messages WHERE user_id = $1', [id])   
            return true
        } 
        catch(e){ 
            return false; 
        }
    } 

    async logging_in(username, password) { 
        try{
            const result = await client.query('SELECT (name, password) FROM chitter_profile WHERE name = $1 AND password = $2', [username, password]) 
            if (result.rows.length === 1) {
                return await client.query('SELECT profile_id FROM chitter_profile WHERE name = $1 AND password = $2', [username, password] ) 
            } else {
                return 'error'
            }
        } 
        catch(e) {
            console.log(e) 
            return false
        }
    }

    async new_chitter_account(name, email, password) { 
        try { 
            const results = await client.query('SELECT (name, email) FROM chitter_profile WHERE name = $1 OR email = $2 ', [name, email])  
            if (results.rows.length === 0) {
                await client.query('INSERT INTO chitter_profile (profile_id, name, email, password) VALUES(DEFAULT, $1, $2, $3)', [name, email, password])   
                console.log('New User add')
                return true
            } else {  
                return 'error'
            }  
        }
        catch(e) {
            return false
        }
    } 
 
    async email(peep, id) { 
        // for some resion async doesent work in this funaction 
        console.log(id)
        try {
            peep.split(' ').forEach(async item => {
                if (item.includes('@')) { 
                    const email_to = await client.query('SELECT email FROM chitter_profile WHERE name = $1', [item.substring(1)])   
                    const email_from = await client.query('SELECT email FROM chitter_profile WHERE profile_id = $1', [id])
                    await Media.send_email(email_to.rows, email_from)     
                }   
            })  
            return true
        }
        catch(e) {
            return false
        } 
    }   
    
    
    async send_email(email_to, email_from) {
        try { 
            console.log(email)  
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = { 
                to: email_to, 
                from: email_from,
                subject: 'Someone is talking about you on chitter',
                text: "Login in to chitter and see who's talking about",
                html: "<strong><p>You have been tagged in some one's Peep, sign in to have a look!</p></strong>",  
                mail_settings: {
                    sandbox_mode: {
                        enable: process.env.NODE_ENV === 'test',
                    },
                }
            } 
            sgMail
            .send(msg)
            .then(() => {
            console.log('Email sent')
            }) 
            .catch((error) => {
                console.error(error.response.body)
            }) 
        } 
        catch(e) {
            return false
        }
    }


}  

Media = new soicalMedia  
Media.start() 

module.exports = soicalMedia


//to run the web app npm run devStart 

//for test coverage ( npx jest --coverage )