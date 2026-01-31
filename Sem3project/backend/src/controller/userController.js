import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import bcrypt from 'bcryptjs'; // changed this
// Signup Function
export const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      pets: [],
    });

    await newUser.save();
    res.status(200).json({ message: "User created successfully", success: true });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login Function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required.", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials.", success: false });
    }

    res.status(200).json({
      message: "Login successful.",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        pets: user.pets,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Logout Function
export const logout = (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(200).json({ message: "Logged out successfully.", success: true });
    });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Change Password Function
export const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully.", success: true });
  } catch (error) {
    console.error("Error changing password:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add Pet Function
export const addPet = async (req, res) => {
  try {
    const { email, name, breed, age, healthStatus } = req.body;

    if (!email || !name || !breed || !age || !healthStatus) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newPet = { name, breed, age, healthStatus };
    user.pets.push(newPet);
    await user.save();

    res.status(200).json({ message: "Pet added successfully.", success: true, pets: user.pets });
  } catch (error) {
    console.error("Error adding pet:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Pets Function
export const getPets = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ success: true, pets: user.pets });
  } catch (error) {
    console.error("Error fetching pets:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit Pet Function
export const editPet = async (req, res) => {
  try {
    const { email, petId, newPetData } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const pet = user.pets.id(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    pet.name = newPetData.name || pet.name;
    pet.breed = newPetData.breed || pet.breed;
    pet.age = newPetData.age || pet.age;
    pet.healthStatus = newPetData.healthStatus || pet.healthStatus;

    await user.save();
    res.status(200).json({ message: "Pet updated successfully.", success: true, pet });
  } catch (error) {
    console.error("Error editing pet:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Pet Function
export const deletePet = async (req, res) => {
  try {
    const { email, petId } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const petIndex = user.pets.findIndex((pet) => pet._id.toString() === petId);
    if (petIndex === -1) {
      return res.status(404).json({ message: "Pet not found." });
    }

    user.pets.splice(petIndex, 1);  // Remove the pet from the array
    await user.save();

    res.status(200).json({ message: "Pet deleted successfully.", success: true, pets: user.pets });
  } catch (error) {
    console.error("Error deleting pet:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

