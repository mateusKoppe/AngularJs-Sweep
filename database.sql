CREATE DATABASE sweep;

USE sweep;

CREATE TABLE users (
  user_id int(11) PRIMARY KEY AUTO_INCREMENT,
  user_username varchar(50) NOT NULL,
  user_password varchar(20) NOT NULL,
  user_class varchar(60) DEFAULT NULL
);

CREATE TABLE studants (
  studant_id int(11) PRIMARY KEY AUTO_INCREMENT,
  studant_name varchar(40) NOT NULL,
  studant_times int(11) DEFAULT 0,
  user_id int(11) NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE NO ACTION
);