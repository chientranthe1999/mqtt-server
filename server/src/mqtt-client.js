var mqtt = require('mqtt')
const { saveGardenInfor } = require('./firebase.js')

var options = {
  port: 1883,
  clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8'
}

const mqttClient = mqtt.connect('mqtt:broker.mqtt-dashboard.com', options)

mqttClient.on('connect', function () {
  console.log('mqttClient connected')
  mqttClient.subscribe('SmartGaden')
})

const regex = /(?<date>.+)\/Node 1\/(?<air_humidity>.+)\/(?<soil_humidity>.+)\/(?<air_temperature>.+)\/(?<light>.+)/
// air_humidity, soil_humidity, air_temperature, light

mqttClient.on('message', function (topic, message) {
  try {
    const data = message.toString().match(regex)
    const { date, air_humidity, soil_humidity, air_temperature, light } = data.groups
    const id = new Date(date).getTime()
    saveGardenInfor(id, {
      date: id,
      air_humidity,
      soil_humidity,
      air_temperature,
      light
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = mqttClient
