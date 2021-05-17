CREATE TABLE chitter_profile ( 
            profile_id SERIAL PRIMARY KEY, 
            name VARCHAR(25) NOT NULL, 
            email VARCHAR(25) NOT NULL,  
            password VARCHAR(45) NOT NULL 
        ); 