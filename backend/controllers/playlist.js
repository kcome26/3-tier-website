import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../tables/user.js';
import Playlist from '../tables/playlist';
import { json } from 'sequelize/dist/lib/sequelize';

const deletePlaylist = (req, res, next) => {
    const state = req.query;
    console.log(req.query.email);
    console.log(req.query.name);
    Playlist.destroy({ where : { 
        email: state.email,
        name: state.name,
    }});
}

const deleteSongs = (req, res, next) => {
    const body = req.body;
    console.log(body.email);
    console.log(body.songs);
    Playlist.findOne({ where : {
        name: body.name, 
        email: body.email,
    }})
    .then(dbplaylist => {
        if(!dbplaylist){
            return res.status(405).json({message: "playlist does not exists"});
        } else{
            var songs = JSON.parse(dbplaylist.songs);
            var song = body.songs;
            songs.splice (songs.indexOf(song));
            dbplaylist.songs = songs;
            dbplaylist.save();
            return res.status(200).json({songs: dbplaylist.songs, message: "playlist exists"});
        }

    })
    .catch(err => {
    console.log('error', err);
    });
}

const updatePlaylist = (req, res, next) => {
    const body = req.body;
    console.log(body.email);
    console.log(body.songs);
    Playlist.findOne({ where : {
        name: body.name, 
        email: body.email,
    }})
    .then(dbplaylist => {
        if(!dbplaylist){
            return res.status(405).json({message: "playlist does not exists"});
        } else{
            var songs = JSON.parse(dbplaylist.songs);
            var song = body.songs;
            songs.push(song);
            dbplaylist.songs = songs;
            dbplaylist.save();
            return res.status(200).json({songs: dbplaylist.songs, message: "playlist exists"});
        }

    })
    .catch(err => {
    console.log('error', err);
    });
}
const getPlaylist = (req, res, next) => {
    const state = req.query;
    console.log(req.query.email);
    console.log(req.query.name);
    Playlist.findOne({ where : {
        name: state.name, 
        email: state.email,
    }})
    .then(dbplaylist => {
        if(!dbplaylist){
            return res.status(405).json({message: "playlist does not exists"});
        } else{
            return res.status(200).json({songs: dbplaylist.songs, message: "playlist exists"});
        }

    })
    .catch(err => {
    console.log('error', err);
    });
}
const getPlaylists = (req, res, next) => {
    const state = req.query;
    console.log(req.query.email);
    console.log(req.query.name);
    Playlist.findAll({ where : { 
        email: state.email,
    }})
    .then(data => {

        res.send(data);
        
        })
    .catch(err => {
    console.log('error', err);
    });
}
const createPlaylist = (req, res, next) => {
    Playlist.findOne({ where : {
        name: req.body.name, 
        email: req.body.email,
    }})
    .then(dbplaylist => {
        if (dbplaylist) {
            return res.status(409).json({message: "Email already exists!"});
        } else if (req.body.email) {
                return Playlist.create(({
                    email: req.body.email,
                    name: req.body.name,
                    songs:req.body.songs
                }))
                .then(() => {
                    res.status(200).json({message: "playlist created!"});
                })
                .catch(err => {
                    console.log(err);
                    res.status(504).json({message: "Error "});
                });
        } else if (!req.body.name) {
            return res.status(400).json({message: "error"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "error"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};
export { createPlaylist, updatePlaylist, getPlaylist, getPlaylists, deletePlaylist, deleteSongs};