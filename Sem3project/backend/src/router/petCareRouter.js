import express from 'express';
import { Signup, login, addPet, getPets, editPet, deletePet, changePassword } from '../controller/userController.js';

const router = express.Router();

// User Signup
router.post('/signup', Signup);

// User Login
router.post('/login', login);

// User Logout (Session-based logout)
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logged out successfully." });
  });
});

// Change Password
router.put('/change-password', changePassword);  // Changed to PUT because it's modifying data

// Add a new pet (POST)
router.post('/pets', addPet);

// Get all pets of a user (GET)
router.get('/pets', getPets);

// Edit an existing pet (PUT)
router.put('/pets/:petId', editPet);

// Delete a pet (DELETE)
router.delete('/pets/:petId', deletePet);

export default router;
