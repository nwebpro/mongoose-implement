import express from 'express'
import { createUser, getAdminUsers, getSingleUser, getUsers } from './user.controller'
const router = express.Router()

router.get('/', getUsers)
router.post('/create-user', createUser)
router.get('/admins', getAdminUsers)
router.get('/:id', getSingleUser)

export default router

// Call Pattern
// Route => Controller => Service => Model