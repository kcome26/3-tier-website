
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
  
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Playlist from "./components/Playlist.js";
import Signup from "./components/Signup.js";
import Review from "./components/Review.js";
import Playlists from "./components/Playlists";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />

        <Route path="/Login" element={<Login/>} />

        <Route path="/Signup" element={<Signup/>} />
            
        <Route path="/Home" element={<Home/>} />

        <Route path="/Playlist" element={<Playlist/>} />

        <Route path="/Playlists" element={<Playlists/>} />

        <Route path="/Reviews" element={<Review/>} />
      </Routes>
    </Router>
  );
}
  
export default App;
