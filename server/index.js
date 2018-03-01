const express = require('express')
const sse = require('sse-broadcast')()
const app = express()
const { promisify } = require('util')
const smi = promisify(require('./smi'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.get('/stream', (req, res) => {
  setInterval(async () => {
    const { nvidia_smi_log: { gpu } } = await smi()
    sse.sendEvent(res, 'message', JSON.stringify(gpu))
    console.log('update')
  }, 5000)
})

app.get('/', (req, res) => {
  res.send('ok')
})

app.listen(5000, '0.0.0.0')
