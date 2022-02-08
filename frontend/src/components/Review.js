import React, {useState} from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";

const API_URL = 'http://52.14.92.240:80';

const Review = () => {
    const {state} = useLocation();
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [songs, setSongs] = useState(JSON.parse(state.songs));
    const [reviews, setReviews] = useState([]);
    const [ratingAverage, setRatingAverage] = useState(state.rating);
    const [saveComment, setSaveComment] = useState('');
    const navigate = useNavigate();

    const deleteRating = () => {
        saveRating();
        axios.delete(`${API_URL}/deleteRating`, 
        {params: {
           name: state.name,
           email: state.email,
        }})
        .then(function (response) {

        })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (response) {
        console.log(response);
      });
      console.log(saveComment);
    handleRemoveItem(saveComment);
    }

    const addRating = () => {
        const payload = {
            email: state.email,
            name: state.name,
            rating: rating,
            comment: comment,
        };
        axios
        .post(`${API_URL}/createReview`, payload,{"Access-Control-Allow-Origin": true})
        .then(function (response) {
            // handle success
                getRating();
                console.log(rating);
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .then(function () {
            // always executed
            });
    }

    const saveRating = () => {
        axios.get(`${API_URL}/getReview`, 
        {params: {
           name: state.name,
           email: state.email,
        }})
        .then(function (response) {
            var data = response.data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].name !== state.stateName){
                    setSaveComment(data[i].comment);
                }
              }
        })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }

    const getRating = () => {
        axios.get(`${API_URL}/getReview`, 
        {params: {
           name: state.name,
           email: state.email,
        }})
        .then(function (response) {
        setRatings(response.data);
        console.log(response.data);

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
        var count = 0;
        for (let i = 0; i < data.length; i++) {
            count += data[i].rating;
            if (data[i].comment !== ""){
                addReviews(data[i].comment);
            }
          }
        setRatingAverage(count / data.length);
    }

    const handleRemoveItem = item => {
        // assigning the list to temp variable
        const temp = [...reviews];
    
        // removing the element using splice
        temp.splice(reviews.indexOf(item), 1);
    
        // updating the list
        setReviews(temp);
    }

    const addReviews = (data) => {
        setReviews((prevplaylists) => [
            ...prevplaylists, data
        ]);
    };
    const gohome = () => {
        navigate("/Home", {state: {name: state.stateName, email: state.email}})
    }
  return (
    <div>
      <h1>Now viewing {state.name}</h1>
      <h1>Rating {ratingAverage?.toFixed(2)}</h1>
      <br />
      <form>
      <label>Enter rating between one and five:
        <input
          type="text" 
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      </form>
      <form>
      <label>comment on this playlist:
        <input
          type="text" 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      </form>
      <Button onClick={addRating}>add your review</Button>
      <Button onClick={deleteRating}>delete your review</Button>
      <Button onClick={getRating}>view comments</Button>
      <ul>
        {
          songs.map((song) =>
            <li key = {song}> {song}
            </li>
          )
        }
      </ul>
      <ul>
      {
          
          reviews.map((review) =>
            <li key = {review}> {review}
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
export default Review;