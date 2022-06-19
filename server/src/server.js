const port = 3000
const express = require('express')

const app = express()

// cor config
var cors = require('cors')
app.use(cors())

// Run MQTT client
require('./mqtt-client.js')

// init firebase
const { getGardenInfor } = require('./firebase.js')

// route
app.get('/garden', async function (req, res) {
  try {
    const gardenInfor = await getGardenInfor()
    if (Object.keys(gardenInfor).length) {
      res.send(Object.values(gardenInfor))
    }
  } catch (e) {
    console.log(e)
    res.send([])
  }
})

app.listen(port, () => {
  console.log('APP is running')
})
