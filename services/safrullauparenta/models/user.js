const { ObjectID } = require('mongodb')
const { database } = require('../config/config.js')
const usersCollection = database.collection('users')

if(usersCollection){
  usersCollection.createIndex({accountNumber: 1})
    .then( result => console.log(`Index created: ${result}`) )
  
  usersCollection.createIndex({identityNumber: 1})
    .then( result => console.log(`Index created: ${result}`) )
}

class User {
  static fetchUsers () {
    return usersCollection.find({}).toArray()
  }

  static addUser (obj) {
    return usersCollection.insertOne(obj)
  }

  static editUser (id, obj) {
    return usersCollection.updateOne({_id: ObjectID(id)}, {
      $set: obj
    })
  }

  static deleteUser (id) {
    return usersCollection.deleteOne({_id: ObjectID(id)})
  }

}

module.exports = { User }