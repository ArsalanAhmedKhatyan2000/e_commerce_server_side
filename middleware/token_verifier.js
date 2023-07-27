const express = require('express');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const isVerified = jwt.verify(token, "this is secret key");
            if (isVerified) {
                req.user = isVerified;
                next();
            } else {
                res.status(401).json({ error: "Incorrect token" });
            }
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }

}

const verifyTokenAndAdminAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.type == 'admin') {
            next();
        } else {
            res.status(404).json({ error: "Unauthorized access" });
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAdminAuthorization
}