var mqtt = require('mqtt')

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

const isBetween = (value, min, max) => {
  return value >= min && value < max
}

const equal1 = (c, q, bp) => {
  return ((q[1] - q[0]) * (bp[1] - c)) / (b[1] - b[0]) + q[1]
}

const initBOD = (bod) => {
  let q = []
  let bp = []
  const val = [100, 75, 50, 25, 1]
  const ranges = [
    [4, 6],
    [6, 15],
    [15, 25],
    [25, 50],
    [50, 100]
  ]

  const findedIndex = ranges.findIndex((range) => isBetween(bod, range[0], range[1]))
  bp[0] = val[findedIndex][0]
  bp[1] = val[findedIndex][1]
  q[0] = val[findedIndex]
  q[1] = val[findedIndex + 1] ?? val[findedIndex]
}

mqttClient.on('message', function (topic, message) {
  const data = message.toString()

  const [deviceId, turbidity, temperature] = data.split(' ')
})

module.exports = mqttClient
