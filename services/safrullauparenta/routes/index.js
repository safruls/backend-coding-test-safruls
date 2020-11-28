const router = require('express').Router()
const Controller = require('../controllers/userController.js')

router.get('/', Controller.fetchUsers)
router.get('/token', Controller.getToken)
router.post('/', Controller.addUser)
router.put('/:id', Controller.editUser)
router.delete('/:id', Controller.deleteUser)
router.get('/account/:accountNumber', Controller.fetchUserByAccountNumber)
router.get('/identity/:identityNumber', Controller.fetchUserByIdentityNumber)


module.exports = router