import express from 'express'
import { PORT } from './config.js'
import { UseRepository } from './userRepository.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', async (req, res) => {
  res.send('bienvenido a register')
  const { username, password } = req.body
  try {
    const user = await UseRepository.create(username, password)
    res.send({ user })
    console.log(user)
  } catch (error) {
    res.status(400).send('Error creating')
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
