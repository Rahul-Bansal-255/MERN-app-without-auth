import express from 'express';
import * as userController from './controller.js';

const userRoutes = express.Router();

userRoutes.get('/', userController.getAllUsers);

userRoutes.get('/:id', userController.getUserById);

userRoutes.post('/', userController.addUser);

userRoutes.patch('/:id', userController.updateUser);

userRoutes.delete('/:id', userController.deleteUser);

export default userRoutes;