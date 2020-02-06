create table users (
    id serial primary key,
    username varchar(150), 
    password varchar(20), 
    profile_pic text
);

ALTER TABLE users
DROP COLUMN password;

ALTER TABLE users
ADD password text;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT references users(id),
    title VARCHAR(200),
    image TEXT,
    content TEXT
);