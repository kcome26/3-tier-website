import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../tables/user.js';
const signup = (req, res, next) => {
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "Email already exists!"});
        } else if (req.body.email && req.body.password) {
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return User.create(({
                        email: req.body.email,
                        name: req.body.name,
                        password: passwordHash,
                    }))
                    .then(() => {
                        const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                        res.status(200).json({message: "User created!", token: token});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "Error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "Password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "Email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const login = (req, res, next) => {
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "User not found.. 😔.."});
        } else {
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) { 
                    res.status(502).json({message: "Error while checking user password"});
                } else if (compareRes) { 
                    const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "User logged in", token: token});
                } else { 
                    res.status(401).json({message: "Invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req;
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: 'Not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'Unauthorized' });
    } else {
        res.status(200).json({ message: 'Here is your resource' });
    };
};

export { signup, login, isAuth };