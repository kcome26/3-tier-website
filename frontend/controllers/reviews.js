import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../tables/user.js';
import Reviews from '../tables/reviews';
import { json } from 'sequelize/dist/lib/sequelize';


const deleteRating = (req, res, next) => {
    const state = req.query;
    console.log(req.query.email);
    console.log(req.query.name);
    Reviews.destroy({ where : { 
        email: state.email,
        name: state.name,
    }})
}


const getReview  = (req, res, next) => {
    const state = req.query;
    console.log(req.query.email);
    console.log(req.query.name);
    Reviews.findAll({ where : { 
        name: state.name,
    }})
    .then(data => {

        res.send(data);
        
        })
    .catch(err => {
    console.log('error', err);
    });
}

const createReview = (req, res, next) => {
    Reviews.findOne({ where : {
        name: req.body.name, 
        email: req.body.email,
    }})
    .then(dbreview => {
        if (req.body.email) {
                return Reviews.create(({
                    email: req.body.email,
                    name: req.body.name,
                    rating: req.body.rating,
                    comment: req.body.comment,
                }))
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    console.log(err);
                    res.status(504).json({message: "Error "});
                });
        } else if (!req.body.name) {
            return res.status(400).json({message: "Error"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "Error"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

export { createReview, deleteRating, getReview};