import DBLocal from 'db-local'
import bcrypt from 'bcrypt'
import {SALTROUNDS} from './config.js'
const { Schema } = new DBLocal({ path: './database/db-local' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  correo: { type: String, required: true },
  edad: { type: String },
  fechaNacimiento: { type: String }
})
export class UseRepository {
  static async create ({ username, password }) {
    // 1.validamos campos
    Validaciones.username(username)
    Validaciones.password(password)

    // 2. validamos que no se repita el username
    const user = User.findOne({ username })
    if (user) throw new Error('Username already exists')
    
    // 3. antes de crear el username haseamos la password
   const hashepassword = await  bcrypt.hash(user.password, SALTROUNDS)
    // 4. creamos el usuario
    const newUser = new User({
      _id: ,
      username,
      password:hashepassword
    })
    return newUser.save()
  }

  static login ({ username, password }) {

  }
}

class Validaciones {
  static username ({ username }) {
    if (username !== 'String') throw new Error('Username must be')
    if (username.length < 3) throw new Error('Username must be at least 3 characters')
  }

  static password ({ password }) {
    if (password !== 'String') throw new Error('Username must be')
    if (password.length < 3) throw new Error('Username must be at least 3 characters')
  }

  static correo ({ correo }) {
    if (correo !== 'String') throw new Error('Username must be')
    if (correo.length < 3) throw new Error('Username must be at least 3 characters')
  }

  static edad ({ edad }) {
    if (edad !== 'String') throw new Error('Username must be')
    if (edad.length < 3) throw new Error('Username must be at least 3 characters')
  }

  static fechaNacimiento ({ fechaNacimiento }) {
    if (fechaNacimiento !== 'String') throw new Error('Username must be')
    if (fechaNacimiento.length < 3) throw new Error('Username must be at least 3 characters')
  }
}
