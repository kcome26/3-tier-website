import express from 'express';

import { signup, login, isAuth } from '../controllers/authorization';
import { getPlaylists, getPlaylist, createPlaylist, updatePlaylist, deleteSongs, deletePlaylist } from '../controllers/playlist';
import { createReview, getReview, deleteRating } from '../controllers/reviews';
const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/private', isAuth);

router.get('/getPlaylists', getPlaylists);

router.get('/getPlaylist', getPlaylist);

router.post('/createPlaylist', createPlaylist);

router.post('/updatePlaylist', updatePlaylist);

router.post('/deleteSongs', deleteSongs);

router.delete('/deletePlaylist', deletePlaylist);

router.post('/createReview', createReview);

router.get('/getReview', getReview);

router.delete('/deleteRating', deleteRating);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is public resource" });
});

router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});
export default router;