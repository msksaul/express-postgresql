const bcrypt = require('bcrypt')

async function verifyPassword() {
  const myPassword = 'admin123'
  const hash = '$2b$10$AcrcCGmhiyFM11o.Q3/OE.nn4EzKZ.ssVWKPvfbJ4hvoDhIMnS8sW'
  const pass = await bcrypt.compare(myPassword, hash)
  console.log(pass)
}

verifyPassword()