const express = require('express');
const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    profilePic: { type: String, required: false, default: null },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: false, default: null },
    type: { type: String, required: true },
    fcmToken: { type: String, required: false, default: null },
}, { timestamps: true })

module.exports = mongoose.model('users', userScheme);