const express = require('express');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const ensureToken = req.headers.authorization;
        if (!ensureToken) {
            return res.status(404).json({ error: "Authorization token is necessary" });
        }
        const token = ensureToken.split(" ")[1];
        if (token) {
            const isVerified = jwt.verify(token, "this is secret key");
            if (isVerified) {
                req.user = isVerified;
                next();
            } else {
                return res.status(401).json({ error: "Incorrect token" });
            }
        }
    } catch (error) {
        return res.status(401).json({ error: error.message });
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