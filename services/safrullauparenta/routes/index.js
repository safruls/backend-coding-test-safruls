const router = require('express').Router()
const Controller = require('../controllers/controller.js')

router.get('/users', Controller.fetchUsers)
router.post('/users', Controller.addUser)
router.put('/users/:id', Controller.editUser)
router.delete('/users/:id', Controller.deleteUser)
router.get('/users/:accountNumber')
router.get('/users/:identityNumber')


module.exports = router