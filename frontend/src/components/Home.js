import React, {useState} from "react";
import axios from 'axios';
import { Link, useNavigate, useLocation } from "react-router-dom";
import background from '../images/background.png'
import styled from "styled-components";
const API_URL = 'http://52.14.92.240:80';
const Home = () => {
    const {state} = useLocation();
    const [name, setName] = useState('');
    const [reviewUser, setReviewUser] = useState('');
    const [reviewPlaylist, setReviewPlaylist] = useState('');
    const [playlistname, setPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [populateplaylist, setpopulateplaylist] = useState('');
    const [reviews, setReviews] = useState([]);
    var ratingaverage = 0;
    const navigate = useNavigate();

    const setPlaylist = (data) => {
        console.log(playlists.length)
        if (playlists.length < data.length){
        for (let i = 0; i < data.length; i++) {
            addPlaylists(data[i].name);
          }
        }
    }

    const getPlaylists = () =>{
        axios.get(`${API_URL}/getPlaylists`, 
        {params: {
           name: name,
           email: state.email,
        }})
        .then(function (response) {
        setPlaylist(response.data);
        //console.log(response);

        })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }

    const gotoPlaylist = () => {
        axios.get(`${API_URL}/getPlaylist`, 
        {params: {
           name: playlistname,
           email: state.email,
        }})
        .then(function (response) {
        // handle success
        console.log(response.data.songs);
        console.log(response);
        navigate("/Playlist", {state: {statename: state.name, name: playlistname, email: state.email, songs: response.data.songs}})
        })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }

    const getRating = (songs) => {
        axios.get(`${API_URL}/getReview`, 
        {params: {
           name: reviewPlaylist,
           email: reviewUser,
        }})
        .then(function (response) {
        setRatings(response.data);
        var data = response.data;
        console.log(ratingaverage);
        navigate("/Reviews", {state: {stateName: state.name,name: reviewPlaylist, email: state.email, songs: songs, rating: ratingaverage, comment: data.comment}})
        })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }

    const setRatings = (data) => {
        console.log(reviews.length)
        setReviews([]);
        console.log(reviews.length)
        for (let i = 0; i < data.length; i++) {
            ratingaverage += data[i].rating
            addReviews(data[i].comment);
          }
        return ratingaverage /= data.length
    }

    const addReviews = (data) => {
        setReviews((prevplaylists) => [
            ...prevplaylists, data
        ]);
    };

    const gotoReview = () => {
        axios.get(`${API_URL}/getPlaylist`, 
        {params: {
           name: reviewPlaylist,
           email: reviewUser,
        }})
        .then(function (response) {
        // handle success
        console.log(response.data.songs);
        console.log(response);
        getRating(response.data.songs);
        })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }
    const addPlaylists = (data) => {
        setPlaylists((prevplaylists) => [
            ...prevplaylists, data
        ]);
    };

    const gotocreatePlaylist = () => {
        navigate("/Playlists", {state: {name: state.name, email: state.email}})
    }
    const logOut = () => {
        navigate("/Login")
    }
  return (
    <div  styles={{ backgroundImage: `url(${background})`  }}>
      <h1>Welcome {state.name}!</h1>
      <br />
      <Button onClick={gotocreatePlaylist}>playlist creation screen</Button>
      <br/>
      <Button onClick={getPlaylists}>view playlists</Button>
      <ul>
      {
          
          playlists.map((playlist) =>
            <li key = {playlist}> {playlist}
            </li>
          )
        }
        </ul>
      <form>
      <label>Enter the name of your playlist you want to view:
        <input
          type="text" 
          value={playlistname}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </label>
      </form>
      <Button onClick={gotoPlaylist}>open playlist</Button>
      <form>
      <label>Enter the user you want to view:
        <input
          type="text" 
          value={reviewUser}
          onChange={(e) => setReviewUser(e.target.value)}
        />
      </label>
      </form>
      <form>
      <label>Enter the playlist you want to view:
        <input
          type="text" 
          value={reviewPlaylist}
          onChange={(e) => setReviewPlaylist(e.target.value)}
        />
      </label>
      </form>
      <Button onClick={gotoReview}>Find playlist</Button>
      <br />
      <Button onClick={logOut}>logout</Button>
    </div>
  );
};
const Button = styled.button`
background-color: purple;
color: white;
font-size: 10px;
padding: 10px 10px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
&:disabled {
  color: grey;
  opacity: 0.7;
  cursor: default;
}
`;
export default Home;