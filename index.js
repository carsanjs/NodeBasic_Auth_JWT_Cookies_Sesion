import express from 'express'
import { PORT } from './config.js'
import { UseRepository } from './userRepository.js'

const app = express()

app.use(express.static('public')) // Servir archivos estáticos desde la carpeta "public"
app.use(express.static('node_modules')) // Servir archivos estáticos desde la carpeta "js"

app.set('view engine', 'ejs') // motor de vistas EJS

// middleware, funcion que se ejecuta antes que llegue a la peticiones pasa la peticion por ahi, los trata
app.use(express.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/register', (resquet, response) => {
  response.render('register')
})

app.get('/login', (resquet, response) => {
  response.render('login')
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const id = await UseRepository.create({ username, password })
    res.send({ id })
    res.send('Register Successfully')
    console.log(id)
  } catch (error) {
    // no es buena idea mandar el error del userRepository
    console.log('error catch' + error)
    res.status(400).send(error)
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log('usernamex ->', username + ' passwordx ->', password)
  try {
    const user = await UseRepository.login({ username, password })
    res.send({ user })
    res.send('Login Successfully')
  } catch (error) {
    res.status(401).send('Unauthorized: Incorrect username or password')
    // res.send('error de login ', error)
    // console.error('error login', error)
    // res.status(401).json({ status: '401', message: 'faield login' }) // 401 sin autorization
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
