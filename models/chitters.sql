-- first table interation | 13/06/2021 

CREATE TABLE chitter_messages ( user_id serial PRIMARY KEY, message VARCHAR ( 100 ) NOT NULL, created_on TIMESTAMP NOT NULL);   

ALTER TABLE chitter_messages ADD COLUMN chitter_profile VARCHAR

-- First insert into table 

INSERT INTO chitter_messages(user_id, message, created_on, chitter_profile) VALUES (DEFAULT, 'This is my first message in JS', current_timestamp, 1); 

-- Second insert into table 

INSERT INTO chitter_messages(user_id, message, created_on, chitter_profile) VALUES (DEFAULT, 'Working with express this time', current_timestamp, 2);  

-- Third insert into table 

INSERT INTO chitter_messages(user_id, message, created_on, chitter_profile) VALUES (DEFAULT, 'Working out how to use SQL in JS', current_timestamp, 3);  


-- postres -- is just the name:)

-- psql postgres <-- will open the database 