const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signupUser(req, res) {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(403).json({ error: 'email already exists' });
        }
        // Hash the password before saving
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hashedPassword) {
                const userData = userModel({
                    profilePic: req.body.profilePic,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword,
                    phoneNumber: req.body.phoneNumber,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    address: req.body.address,
                    type: req.body.type
                });
                userModel.create(userData)
                    .then((response) => {
                        return res.status(201).json("Registeration completed successfully");
                    })
                    .catch((err) => {
                        return res.status(500).json({ error: err.message })
                    });
            });
        });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
            if (isPasswordMatched) {
                const token = jwt.sign({
                    id: existingUser.id,
                    email: existingUser.email,
                    type: existingUser.type,
                    fcmToken: existingUser.fcmToken,
                },
                    "this is secret key",
                    // { expiresIn: "24h" }
                );
                return res.status(200).json({
                    _id: existingUser.id,
                    profilePic: existingUser.profilePic,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    email: existingUser.email,
                    phoneNumber: existingUser.phoneNumber,
                    dob: existingUser.dob,
                    gender: existingUser.gender,
                    address: existingUser.address,
                    type: existingUser.type,
                    token: token,
                    fcmToken: existingUser.fcmToken,
                });
            }
            return res.status(403).json({ error: "Incorrect password" })
        }
        return res.status(404).json({ error: "User does not exist" })

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAllUsers(req, res) {
    try {
        const listOfUsers = await userModel.find().select("-password -__v");
        return res.status(200).json(listOfUsers);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function getUserByID(req, res) {
    try {
        const user = await userModel.findById(req.params.id).select("-password -__v");
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function changePassword(req, res) {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const existingUser = await userModel.findById(req.user.id);
        if (existingUser) {
            const isPasswordMatched = await bcrypt.compare(oldPassword, existingUser.password);
            if (isPasswordMatched) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                await userModel.findByIdAndUpdate(req.user.id, {
                    password: hashedPassword
                }, { new: true }).select("-passsword -__v");
                return res.status(200).json({ message: "Password changed successfully" });
            }
            return res.status(403).json({ error: "Incorrect password" });
        }
        return res.status(404).json({ error: "User does not exist" });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateUser(req, res) {
    try {
        const existingUser = await userModel.findById(req.user.id);
        if (existingUser) {
            const userData = {
                name: req.body.name ?? existingUser.name,
                profilePic: req.body.profilePic ?? existingUser.profilePic,
                age: req.body.age ?? existingUser.age,
                gender: req.body.gender ?? existingUser.gender,
                address: req.body.address ?? existingUser.address,
            };
            const updatedUserData = await userModel.findByIdAndUpdate(req.user.id, userData, { new: true }).select("-password -__v");
            return res.status(200).json(updatedUserData);
        }
        return res.status(404).json({ error: "User does not exist" });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteUsers(req, res) {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.body.id, { new: true });
        console.log("check : " + deletedUser);
        if (deletedUser) {
            return res.status(200).json({ message: "User deleted successfully" });
        }
        return res.status(404).json({ error: "User does not exist" });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateFcmToken(req, res) {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.user.id, { fcmToken: req.body.fcmToken }, { new: true }).select("-password -__v");
        console.log("updatedUser : " + updatedUser);
        if (updatedUser) {
            return res.status(200).json(updatedUser);
        }
        return res.status(404).json({ error: "User does not exist" });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}


// exports.usersStatess = async (req, res) => {
//     // return res.status(200).json("hello");
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//     const previsouYear = new Date(lastYear.setFullYear(lastYear.getFullYear() - 1));
//     try {
//         const data = await userModel.aggregate([
//             {
//                 $match: { createdAt: { $gte: previsouYear } },

//             },
//             {
//                 $project: { month: { $month: "$createdAt" } },
//             }
//             , {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: 1 }
//                 }
//             }
//         ]);
//         console.log(data);
//         return res.status(200).json(data);
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// };

module.exports = { signupUser, loginUser, getAllUsers, getUserByID, changePassword, updateUser, deleteUsers, updateFcmToken };