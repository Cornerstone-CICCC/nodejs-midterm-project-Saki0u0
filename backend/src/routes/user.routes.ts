import { Router, Request, Response } from 'express'
import userController from '../controllers/user.controller'
import { cookieAuthCheck } from '../middleware/auth'

const userRouter = Router()

userRouter.get('/', userController.getUsers)
userRouter.post('/', userController.addUser)
userRouter.get('/auth', cookieAuthCheck, userController.userProfile)
userRouter.get('/:id', userController.getUserById)
userRouter.put('/:id', userController.updateUserById)
userRouter.delete('/:id', userController.deleteUserById)
userRouter.post('/login', userController.loginUser)
userRouter.post('/logout', userController.logoutUser)

export default userRouter