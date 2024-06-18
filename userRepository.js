import DBLocal from 'db-local'
import bcrypt from 'bcrypt'
import { SALTROUNDS } from './config.js'
import crypto from 'crypto'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
  // correo: { type: String, required: true },
  // edad: { type: String },
  // fechaNacimiento: { type: String }
})
export class UseRepository {
  static async create ({ username, password }) {
    // 1.validamos campos
    Validaciones.username(username)
    Validaciones.password(password)

    // 2. validamos que no se repita el username
    const user = User.findOne({ username })
    if (user) throw new Error('Username already exists')

    // generamos el id del username
    const id = crypto.randomUUID()

    // 3. antes de crear el username haseamos la password
    const hashepassword = await bcrypt.hash(password, SALTROUNDS) // hashSync -> bloquea el theread principal

    // 4. creamos el usuario
    User.create({
      _id: id,
      username,
      password: hashepassword
    }).save()

    return id
  }

  static async login ({ username, password }) {
  // 1. validamos campos
    Validaciones.username(username)
    Validaciones.password(password)

    // 2. validamos si el username ya existe
    const user = User.findOne({ username })
    if (!user) throw new Error('Username not found')

    // 3. validar la password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Invalid password')

    // a la hora de retornar el usuario, evadimos el password
    const { password: _, ...publicUser } = user
    return publicUser
  }
}

class Validaciones {
  // en las validaciones las puedes usar con (zod)
  static username (username) {
    if (typeof username !== 'string') throw new Error('Username is not a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Password must be')
    if (password.length < 6) throw new Error('Password must be at least 6 characters')
  }

  static correo ({ correo }) {
    if (typeof correo !== 'string') throw new Error('Username must be')
    if (correo.length < 3) throw new Error('Username must be at least 3 characters')
  }

  static edad ({ edad }) {
    if (typeof edad !== 'string') throw new Error('Username must be')
    if (edad.length < 3) throw new Error('Username must be at least 3 characters')
  }

  static fechaNacimiento ({ fechaNacimiento }) {
    if (typeof fechaNacimiento !== 'string') throw new Error('Username must be')
    if (fechaNacimiento.length < 3) throw new Error('Username must be at least 3 characters')
  }
}
