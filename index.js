import express from 'express'
import { PORT } from './config.js'
import { UseRepository } from './userRepository.js'

const app = express()

app.use(express.static('public')) // Servir archivos estáticos desde la carpeta "public"

app.set('view engine', 'ejs') // motor de vistas EJS

// middleware, funcion que se ejecuta antes que llegue a la peticiones pasa la peticion por ahi, los trata
app.use(express.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/register', async (req, res) => {
  res.render('register')
  const { username, password } = req.body
  try {
    const id = await UseRepository.create({ username, password })
    res.send({ id })
    res.send('Register Successfully')
    console.log(id)
  } catch (error) {
    // no es buena idea mandar el error del userRepository
    console.log('error catch' + error)
    res.status(400).send(error.message)
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log('username ->', username + ' password ->', password)
  try {
    const user = await UseRepository.login({ username, password })
    res.send({ user })
  } catch (error) {
    res.status(401).send(error.message) // 401 sin autorization
  }
})

app.get('/logout', (req, res) => {
  res.send('Hello World!')
})

app.get('/config', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
