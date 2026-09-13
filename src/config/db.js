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