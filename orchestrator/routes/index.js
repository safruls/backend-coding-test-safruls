const router = require('express').Router()
const UserController = require('../controllers/userController.js')

router.get('/', (req, res) => {
  res.status(200).json({message: "Welcome to Orchestrator"})
})

router.get('/users', UserController.fetchUsers)
router.post('/users', UserController.addUser)
router.put('/users/:id', UserController.editUser)
router.delete('/users/:id', UserController.deleteUser)

module.exports = router