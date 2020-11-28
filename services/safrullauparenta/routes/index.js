const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Controller = require('../controllers/userController.js')

// const authorization = (req, res, next) => {
//   const {access_token} = req.headers
//   if(access_token){
//     let decode = jwt.verify(access_token, 'secret123')
//     req.status = decode
//     next()
//   }
//   else{
//     res.status(403).json({message: "You are not authorized"})
//   }
// }

router.get('/token', Controller.getToken)
router.get('/', Controller.fetchUsers)
router.post('/', Controller.addUser)
router.put('/:id', Controller.editUser)
router.delete('/:id', Controller.deleteUser)
router.get('/account/:accountNumber', Controller.fetchUserByAccountNumber)
router.get('/identity/:identityNumber', Controller.fetchUserByIdentityNumber)


module.exports = router