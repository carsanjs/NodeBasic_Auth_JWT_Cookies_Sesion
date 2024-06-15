import express from 'express'
import { PORT } from './config.js'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/register', (req, res) => {
  const { username, password } = req.body
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
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
