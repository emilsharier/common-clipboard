var admin = require("firebase-admin")
var serviceAccount = require("../keys/key.json")
require('dotenv').config()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL
})

const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
}

const syncClipboard = (data) => {

    const message = {
        notification: {
            title: 'Tap to copy',
            body: data,
            sound: 'default',
            icon: 'ic_launcher',
            click_action: 'FLUTTER_NOTIFICATION_CLICK'
        }
    }
    admin.messaging().sendToTopic('all', message, options).then(val => {}).catch(err => {})
}

module.exports = syncClipboard