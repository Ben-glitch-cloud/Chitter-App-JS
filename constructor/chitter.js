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
            return results.rows.map((item) => ( {message_id: item.user_id, message: item.message, message_time: item.created_on} ))  
        }
        catch(e) {
            return []; 
        }

    }  

    async newChitter(peep) {  
        try{
            await client.query('INSERT INTO chitter_messages (user_id, message, created_on) VALUES(DEFAULT, $1, current_timestamp)', [peep])  
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

} 

Media = new soicalMedia  
Media.start()

module.exports = soicalMedia


