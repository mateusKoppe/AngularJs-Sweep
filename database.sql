CREATE DATABASE sweep IF NOT EXISTS;

USE sweep;

CREATE TABLE users IF NOT EXISTS (
  user_id int(11) PRIMARY KEY AUTO_INCREMENT,
  user_username varchar(50) UNIQUE NOT NULL,
  user_password varchar(20) NOT NULL,
  user_class varchar(60) DEFAULT NULL
);

CREATE TABLE studants IF NOT EXISTS (
  studant_id int(11) PRIMARY KEY AUTO_INCREMENT,
  studant_name varchar(40) NOT NULL,
  studant_times int(11) DEFAULT 0,
  user_id int(11) NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE NO ACTION
);
