const jwt = require('jsonwebtoken')

const secret = '1234'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2NjY0OTUxOH0.LzsKh6HiDCfNW4cVAD_4IM2jKifUmk9zC8bh3rQlHDM'

function verifyToken(payload, secret) {
  return jwt.verify(payload, secret)
}

const payload = verifyToken(token, secret)
console.log(payload)