const express = require('express')
const sse = require('sse-broadcast')()
const app = express();
app.get('/stream', (req, res) => {
    sse.subscribe('channel', res)
})

setInterval(() => {
    sse.publish('channel', 'update', { xoxo: 42 })
}, 5000)

app.listen(8000);