const mysql=require('mysql2/promise')
const dotenv=require('dotenv')

dotenv.config()

const pool=mysql.createPool({
  user:process.env.DB_USER,
  host:process.evn.DB_HOST,
  database:process.env.DB_NAME,
  port:process.env.DB_PORT,
  password:process.env.DB_PASSWORD
})

module.export=pool


// Sturcture of database table.


/*


CREATE TABLE employees (
id INT PRIMARY KEY  AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL  ,
department VARCHAR(100),
salary INT ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)

CREATE TABLE TASKS (
 id INT PRIMARY KEY AUTO_INCREMENT,
 employee_id INT NOT NULL  ,
 title VARCHAR (200) NOT NULL,
 status ENUM('TODO','IN_PROGRESS','COMPLETED')DEFAULT 'TODO' ,
 priority ENUM('LOW', 'MEDIUM', 'HIGH' )DEFAULT 'MEDIUM', 
 due_date DATE,

FOREIGN KEY (employee_id)
  REFERENCES employees(id) ON DELETE CASCADE

)

*/

