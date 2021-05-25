const {Client} = require('pg')

const client = new Client({
    "port": 5432, 
    "database": "chitter_js", 
})    




class soicalMedia {    

    async start() { 
        const soical = new soicalMedia 
        await soical.connect()
    }

    async connect() {
        try { 
            await client.connect()
        } 
        catch(e) {
            console.log(`Failed to connect ${e}`)
        }
    }

    async allChitter() {  
        try {
            const results = await client.query("SELECT * FROM chitter_messages;") 
            return results.rows.map((item) => ( {message_id: item.user_id, message: item.message, message_time: item.created_on, chitter_id: item.chitter_profile} ))  
        }
        catch(e) {
            return []; 
        }

    }  

    async newChitter(peep, id) {  
        try{ 
            await client.query('INSERT INTO chitter_messages (user_id, message, created_on, chitter_profile) VALUES(DEFAULT, $1, current_timestamp, $2)', [peep, id])   
            return true
        }
        catch(e) { 
            console.log(e)
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
            console.log(e)
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
            console.log(e)  
            return false
        }
    } 
 
    async email(peep) { 
        // for some resion async doesent work in this funaction
        try {
            peep.split(' ').forEach(item => {
                if (item.includes('@')) { 
                    let username = item.substring(1)
                    const results = client.query('SELECT name FROM chitter_profile WHERE name = $1', [username])   
                    console.log(results)
                }
            }) 
        }
        catch(e) {
            console.log(e) 
            return false
        } 
    }

}  

Media = new soicalMedia  

Media.start()

module.exports = soicalMedia


// npm run devStart