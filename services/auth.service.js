const UserService = require('./user.service')
const service = new UserService()
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('../config/config')
const nodemailer = require("nodemailer")

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email)
    if(!user) {
      throw boom.unauthorized()
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      throw boom.unauthorized()
    }
    delete user.dataValues.password
    return user
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token =  jwt.sign(payload, config.jwtSecret)
    return {
      user,
      token
    }
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email)
    if(!user) {
      throw boom.unauthorized()
    }

    const payload = { sub: user.id }
    const token =  jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' })
    const link = `http://myfrontend.com/recovery?token=${token}`
    await service.update(user.id, { recoveryToken: token })

    const mail = {
      from: config.emailSender, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Recovery Password Email", // Subject line// plain text body
      html: `<b>Link for recover password ${link}</b>`, // html body
    }
    const rta = await this.sendMail(mail)
    return rta
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.smtpServer,
      port: 465,
      secure: true,
      auth: {
          user: config.emailUser,
          pass: config.emailPassword
      }
    })
    await transporter.sendMail(infoMail)
    return {  message: 'mail sent'}
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret)
      const user = await service.findOne(payload.sub)
      if(user.recoveryToken !== token) {
        throw boom.unauthorized()
      }
      const hash = await bcrypt.hash(newPassword, 10)
      await service.update(user.id, { recoveryToken: null, password: hash })
      return { message: 'password changed' }
    } catch (error) {
      throw boom.unauthorized()
    }
  }
}

module.exports = AuthService