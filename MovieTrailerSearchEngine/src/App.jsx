import "./App.css";
import MovieTrailerSearchWithAPI from "./components/api_method/MovieTrailerSearchWithAPI";
import Home from "./components/home/home";
import TrailerURLfromMovieSearchLibrary from "./components/library_method/TrailerURLfromMovieSearchLibrary";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/trailer">JS Library Search</Link>
          <Link to="/trailerwithApi">TMDB API Search</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/trailer"
            element={<TrailerURLfromMovieSearchLibrary />}
          />
          <Route
            path="/trailerwithApi"
            element={<MovieTrailerSearchWithAPI />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
