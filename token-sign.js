const jwt = require('jsonwebtoken')

const secret = '1234'
const payload = {
  sub: 1,
  role: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret)
}

const token = signToken(payload, secret)
console.log(token)