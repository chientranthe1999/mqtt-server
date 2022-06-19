var firebase = require('firebase-admin')
const { v4: uuidv4 } = require('uuid')

var serviceAccount = require('./service-account.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://mqtt-server-314e1-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

var db = firebase.database()
var ref = db.ref('garden')

const saveGardenInfor = async (id, data) => {
  try {
    ref.child(id).set(data)
    console.log('Save garden infor successfully')
  } catch (e) {
    console.log(e)
  }
}

const getGardenInfor = async () => {
  const res = await ref.orderByChild('date').limitToFirst(10).get()
  return res.val()
}

module.exports = {
  saveGardenInfor,
  getGardenInfor
}
