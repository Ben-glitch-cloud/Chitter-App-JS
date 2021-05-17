-- first table interation | 13/06/2021 

CREATE TABLE chitter_messages ( user_id serial PRIMARY KEY, message VARCHAR ( 100 ) NOT NULL, created_on TIMESTAMP NOT NULL);   

-- First insert into table 

INSERT INTO chitter_messages(user_id, message, created_on) VALUES (DEFAULT, 'This is my first message in JS', current_timestamp); 

-- Second insert into table 

INSERT INTO chitter_messages(user_id, message, created_on) VALUES (DEFAULT, 'Working with express this time', current_timestamp);  

-- Third insert into table 

INSERT INTO chitter_messages(user_id, message, created_on) VALUES (DEFAULT, 'Working out how to use SQL in JS', current_timestamp);  


-- postres -- is just the name:)

-- psql postgres <-- will open the database 