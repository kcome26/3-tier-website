import React, {useState} from "react";
import axios from 'axios';
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const API_URL = 'http://52.14.92.240:80';
const Home = () => {
    const {state} = useLocation();
    const [name, setName] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    const deletePlaylist = () => {
        axios.delete(`${API_URL}/deletePlaylist`, 
        {params: {
           name: name,
           email: state.email,
        }})
        .then(function (response) {
        console.log(name);
        handleRemoveItem(name);

        })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (response) {
        console.log(response);
      });
      console.log(name);
      handleRemoveItem(name);
    }

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

    const handleRemoveItem = item => {
        // assigning the list to temp variable
        const temp = [...playlists];
    
        // removing the element using splice
        temp.splice(playlists.indexOf(item), 1);
    
        // updating the list
        setPlaylists(temp);
    }

    const addPlaylists = (data) => {
        setPlaylists((prevplaylists) => [
            ...prevplaylists, data
        ]);
    };

    const addPlaylist = () => {
        setPlaylists((prevplaylists) => [
            ...prevplaylists, name
        ]);
    };

    const createPlaylist = () => {
        const payload = {
            email: state.email,
            name: name,
            songs: [],
        };
        axios
        .post(`${API_URL}/createPlaylist`, payload,{"Access-Control-Allow-Origin": true})
        .then(function (response) {
            // handle success
                console.log(name);
                addPlaylist();
            })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
          });
    }
    const gohome = () => {
        navigate("/Home", {state: {name: state.name, email: state.email}})
    }
  return (
    <div>
      <h1>Playlist creation screen</h1>
      <br />
      <form>
      <label>Enter your playlists name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      </form>
      <Button onClick={createPlaylist}>create playlist</Button>
      <br/>
      <Button onClick={deletePlaylist}>delete playlist</Button>
      <br/>
      <Button onClick={getPlaylists}>view playlists</Button>
      <ul>
      {
          
          playlists.map((playlist) =>
            <li  key = {playlist}> {playlist}
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
export default Home;