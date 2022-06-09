module.exports = {
  HOST: "127.0.0.1",
  USER: "db_journalAppUser",
  PASSWORD: "db_password",
  DB: "journalApp",
  port: 3306,
};

//CREATE DATABASE journalApp
//USE journalApp
//CREATE USER db_journalAppUser@'localhost' IDENTIFIED BY 'db_password';
//FLUSH PRIVILEGES;

// CREATE TABLE IF NOT EXISTS journalEntries (
//   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//   entry VARCHAR(800) NOT NULL,
//   feelingState INT  NOT NULL
//   emailHashed VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
//   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// )  ENGINE=INNODB;
