const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'calel',
  password: '1234',
  database: 'my_store'
})

module.exports = pool