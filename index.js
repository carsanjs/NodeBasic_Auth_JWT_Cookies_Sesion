import express from 'express'
import { PORT } from './config.js'
import { UseRepository } from './userRepository.js'

const app = express()

// middleware, funcion que se ejecuta antes que llegue a la peticiones pasa la peticion por ahi, los trata
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  const { username, password, id } = req.body
  console.log('username ->', username + ' password ->', password + ' id ->', id)
  try {
    const id = UseRepository.create({ username, password })
    res.send({ id })
    res.send('Register Successfully')
    console.log(id)
  } catch (error) {
    // no es buena ide mandar el error del userRepository
    console.log('error catch' + error)
    res.status(400).send(error.message)
  }
})

app.post('/login', (req, res) => {
  res.send('Hello World!')
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
