import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import FlipCoin from "./components/Coin_Flip/FlipCoin";
import NumberHub from "./components/Number Guessing Game/NumberHub";
import Rolldice from "./components/RollDice/Rolldice";

function App() {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/coin_flip", label: "Coin Flip" },
    { path: "/number_guess", label: "Number Guess" },
    { path: "/roll_dice", label: "Roll Dice" },
  ];
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
        <main>
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin_flip" element={<FlipCoin />} />
            <Route path="/number_guess" element={<NumberHub />} />
            <Route path="/roll_dice" element={<Rolldice />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
