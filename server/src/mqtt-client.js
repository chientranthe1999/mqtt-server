var mqtt = require('mqtt')
var axios = require('axios')
const { caculateWqi } = require('./initData.js')

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
  mqttClient.subscribe('WqiConnector')
})

mqttClient.on('message', function (topic, message) {
  const data = message.toString()

  const [deviceId, turbidity, temperature] = data.split(' ')
  const result = caculateWqi(turbidity * 20, temperature)

  if (result) {
    axios
      .post('http://localhost:8000/api/v1/infors', {
        ...result,
        turbidity,
        temperature,
        device_id: deviceId
      })
      .then((result) => console.log(result))
      .catch((e) => console.log(e.response))
  }
})

module.exports = mqttClient
