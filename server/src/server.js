const port = 3000
const express = require('express')

const app = express()

// cor config
var cors = require('cors')
app.use(cors())

// Run MQTT client
require('./mqtt-client.js')

app.listen(port, () => {
  console.log('APP is running')
})
