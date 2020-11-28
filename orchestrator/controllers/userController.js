const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis ()
const url = 'http://localhost:3000/'

class UserController {
  static async fetchUsers (req, res, next) {
    const cachedUsers = await redis.get("users")
    if(cachedUsers){
      res.status(200).json(JSON.parse(cachedUsers))
    }
    else{
      axios.get(url)
      .then(async resp => {
          const users = resp.data
          await redis.set("users", JSON.stringify(users))
          res.status(200).json(users)
      })
      .catch(err => res.status(500).json({message: err.message}))
    }
  }

  static async addUser (req, res, next) {
    const { userName, accountNumber, emailAddress, identityNumber } = req.body
    axios.post(url, {
      userName,
      accountNumber: +accountNumber,
      emailAddress,
      identityNumber
    })
    .then(async resp => {
      const user = resp.data
      await redis.del("users")
      res.status(201).json(user)
    })
    .catch(err => res.status(500).json({message: err.message}))
  }

  static async editUser (req, res, next) {
    const id = req.params.id
    const updatedDoc = {
      "userName": req.body.userName,
      "accountNumber": +req.body.accountNumber,
      "emailAddress": req.body.emailAddress,
      "identityNumber": req.body.identityNumber
    }
    axios.put(url + id, updatedDoc)
    .then(async resp => {
      const result = resp.data
      await redis.del("users")
      res.status(200).json(result)
    })
    .catch(err => res.status(500).json({message: err.message}))
  }

  static async deleteUser (req, res, next) {
    const { id } = req.params
    axios({
      method: 'delete',
      url: url + id
    })
    .then(async resp => {
        const result = resp.data
        await redis.del("users")
        res.status(200).json(result)
    })
    .catch(err => res.status(500).json({message: err.message}))
  }

  static async fetchUserByAccountNumber (req, res, next) {
    const { accountNumber } = req.params
    const cachedUsers = await redis.get("users")
    let listOfUsers = JSON.parse(cachedUsers)
    
    if(cachedUsers){
      const selectedUsers = listOfUsers.filter(user => user.accountNumber === +accountNumber) 
      return res.status(200).json(selectedUsers[0]) 
    }
    return axios.get(url + `/accountNumber/${accountNumber}`)
    .then(async resp => {
      const user = resp.data
      listOfusers.push(user)
      await redis.set("users", JSON.stringify(listOfusers))
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({message: err.message}))
  }

  static async fetchUserByIdentityNumber (req, res, next) {
    const { identityNumber } = req.params
    const cachedUsers = await redis.get("users")
    let listOfUsers = JSON.parse(cachedUsers)
    
    if(cachedUsers){
      const selectedUsers = listOfUsers.filter(user => user.identityNumber === identityNumber) 
      return res.status(200).json(selectedUsers[0])
    }
    return axios.get(url + `/identity/${identityNumber}`)
    .then(async resp => {
      const user = resp.data
      listOfusers.push(user)
      await redis.set("users", JSON.stringify(listOfusers))
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({message: err.message}))
  }
}

module.exports = UserController