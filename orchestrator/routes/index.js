const router = require('express').Router()
const jwt = require('jsonwebtoken')
const UserController = require('../controllers/userController.js')

router.get('/', (req, res) => {
  res.status(200).json({message: "Welcome to Orchestrator"})
})


const authorization = (req, res, next) => {
  const {access_token} = req.headers
  if(access_token){
    let decode = jwt.verify(access_token, 'secret123')
    req.status = decode
    next()
  }
  else{
    res.status(403).json({message: "You are not authorized"})
  }
}
router.get('/token', UserController.getToken)
router.get('/users', authorization, UserController.fetchUsers)
router.post('/users', authorization, UserController.addUser)
router.put('/users/:id', authorization, UserController.editUser)
router.delete('/users/:id', authorization, UserController.deleteUser)
router.get('/users/account/:accountNumber', authorization, UserController.fetchUserByAccountNumber)
router.get('/users/identity/:identityNumber', authorization, UserController.fetchUserByIdentityNumber)

module.exports = router