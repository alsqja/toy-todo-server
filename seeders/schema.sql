 
CREATE TABLE users (
  id INT AUTO_INCREMENT,
  name varchar(255),
  email varchar(255),
  password varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE todos (
  id INT AUTO_INCREMENT,
  user_id INT,
  contents varchar(255),
  expiration_date varchar(255),
  is_done boolean,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

ALTER TABLE todos ADD FOREIGN KEY (user_id) REFERENCES users (id);
