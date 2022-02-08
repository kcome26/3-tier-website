import React, {useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";

const API_URL = 'http://52.14.92.240:80';

const Playlist = () => {
    const {state} = useLocation();
    const [name, setName] = useState('');
    const [songs, setSongs] = useState(JSON.parse(state.songs));
    const navigate = useNavigate();

    const deleteSongs = () => {
        const payload = {
            email: state.email,
            name: state.name,
            songs: name,
        };
        axios.post(`${API_URL}/deleteSongs`, payload)
        .then(function (response) {
        // handle success
        console.log(response.data.songs);
        setSongs(response.data.songs);
        console.log(response);
        })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    
    }

    const addSong = () => {
    const payload = {
        email: state.email,
        name: state.name,
        songs: name,
    };
    axios.post(`${API_URL}/updatePlaylist`, payload)
    .then(function (response) {
    // handle success
    console.log(response.data.songs);
    setSongs(response.data.songs);
    console.log(response);
    })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

}

    const gohome = () => {
        navigate("/Home", {state: {name: state.name, email: state.email}})
    }
  return (
    <div>
      <h1>Welcome {state.name}!</h1>
      <br />
      <form>
      <label>Enter a song to add:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      </form>
      <Button onClick={addSong}>add a song</Button>
      <Button onClick={deleteSongs}>remove a song</Button>
      <ul>
        {
          songs.map((song) =>
            <li key = {song}> {song}
            </li>
          )
        }
      </ul>
        <Button onClick={gohome}>home</Button>
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
export default Playlist;