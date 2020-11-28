const { MongoClient } = require('mongodb')
const user = require('../models/user')
const databaseUrl = 'mongodb://localhost:27017/'

const client = new MongoClient(databaseUrl, { useUnifiedTopology: true })
client.connect()
const databaseName = "safrullauparenta"
const collectionName = "users"
const database = client.db(databaseName)
const users = async () => { await database.createCollection(collectionName, {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userName", "accountNumber", "emailAddress", "identityNumber"],
      properties: {
        userName: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        accountNumber: {
          bsonType: "int",
          description: "must be an integer greater than 0 and is required"
        },
        emailAddress: {
          bsonType: "string",
          pattern : "^.+\@.+$",
          description: "must be a string and match the regular expression and is required"
        },
        identityNumber: {
          bsonType: "string",
          description: "must be a string and is required"
        }
      }
    }
  } 
})}

let allCollections = []

const getCollections = async() => { await database.listCollections().toArray(function(err, collections) {
  if(err) console.log(err);
  collections.forEach(eachCollectionDetails => {
    // console.log("masukkk", eachCollectionDetails.name)
    allCollections.push(eachCollectionDetails.name);
  });
  if(allCollections.length < 1){
    // console.log()
    users()
  }

})}



if(allCollections.length === 0){
  getCollections()
}


module.exports = { database }

