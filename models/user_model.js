const express = require('express');
const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, required: false, default: null },
    password: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    fcmToken: { type: String, required: false, default: null },
}, { timestamps: true })

module.exports = mongoose.model('users', userScheme);