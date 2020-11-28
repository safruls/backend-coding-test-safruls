const { User } = require('../models/user.js')

class Controller {
  static async fetchUsers(req, res, next){
    try{
      const users = await User.fetchUsers()
      res.status(200).json(users)
    }
    catch (err) {
      res.status(500).json({message: err.message})
    }
  }

  static async addUser(req, res, next){
    const { userName, accountNumber, emailAddress, identityNumber } = req.body
    
    try{
      const newUser = await User.addUser({
        userName,
        accountNumber: +accountNumber,
        emailAddress,
        identityNumber
      })
      res.status(201).json(newUser) 
    }
    catch (err) {
      console.log(err)
      res.status(500).json({message: err.message})
    }
  }

  static async editUser(req, res, next){
    const id = req.params.id
    const updatedDoc = {
      "userName": req.body.userName,
      "accountNumber": +req.body.accountNumber,
      "emailAddress": req.body.emailAddress,
      "identityNumber": req.body.identityNumber
    }
    try{
      const result = await User.editUser(id, updatedDoc)
      res.status(200).json({message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`})
    }
    catch (err) {
      console.log(err)
      res.status(500).json({message: err.message})
    }
  }

  static async deleteUser(req, res, next){
    const id = req.params.id
    try{
      const result = await User.deleteUser(id)
      if(result.deletedCount === 1){
        res.status(200).json({message: "Successfully deleted 1 document."})
      }
      else{
        res.status(404).json({message: "No documents matched the query. Deleted 0 documents."})
      }
    }
    catch (err) {
      res.status(500).json({message: err.message})
    }
  }

  static async fetchUserByAccountNumber (req, res, next) {
    const { accountNumber } = req.params
    try{
      const user = await User.fetchUserByAccountNumber(+accountNumber)
      res.status(200).json(user)
    }
    catch (err) {
      res.status(500).json({message: err.message})
    }
  }

  static async fetchUserByIdentityNumber (req, res, next) {
    const { identityNumber } = req.params
    try{
      const user = await User.fetchUserByIdentityNumber(identityNumber)
      res.status(200).json(user)
    }
    catch (err) {
      res.status(500).json({message: err.message})
    }
  }

  static getToken (req, res, next) {
    
  }
}

module.exports = Controller