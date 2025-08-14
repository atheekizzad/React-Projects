import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Showpage from "./components/Showpage";
import ListScore from "./components/ListScore";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Showpage />} />
          <Route path="/listOfScores" element={<ListScore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
