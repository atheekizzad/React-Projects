import React, { useEffect, useState } from "react";
import "./Function.css";
import ProcessDetails from "./ProcessDetails";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { FaUtensils } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
function Function() {
  const [recipes, setRecipes] = useState([]);
  const [alertmsg, setAlertmsg] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const spoonacularAPIKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  useEffect(() => {
    if (keyWord.trim().length === 0) {
      setRecipes([]);
    }
  }, [keyWord]);
  const foodfetch = async (recipeName) => {
    setAlertmsg("");
    if (!keyWord || keyWord.trim().length === 0) {
      setAlertmsg("Please Enter Keyword");
      setTimeout(() => {
        setAlertmsg("");
      }, 3000);
      return;
    }
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&apiKey=${spoonacularAPIKey}&number=10`
      );
      //Spoonacular is the Complex Recipe Search API

      if (!res.ok) {
        throw new Error(res.status); //This means the server responded, but with a failure status code.
      } else {
        const data = await res.json();
        const outcome = data.results;
        if (outcome.length == 0) {
          setAlertmsg("No Matches Found");
        } else {
          setRecipes(outcome);
          setAlertmsg("");
        }
      }
    } catch (err) {
      console.error(err); //These are errors thrown before you even get a response.
      setAlertmsg("Error Fetching Recipe Details.");
      setTimeout(() => {
        setAlertmsg("");
      }, 2000);
    }
  };

  return (
    <div className="function-container">
      <h1 className="flex items-center justify-center gap-3 text-3xl font-bold text-green-700">
        <GiForkKnifeSpoon className="text-orange-500" />
        ------ Food <span className="text-red-600">Recipe</span> Finder-------
        <FaUtensils className="text-yellow-600" />
      </h1>
      <h3 className="flex items-center justify-center gap-2 text-xl font-semibold text-gray-700">
        <FaReact className="text-blue-500 animate-spin-slow" />
        ------------ React and{" "}
        <span className="text-green-600">Spoonacular API</span>-------------
        <GiCookingPot className="text-orange-500" />
      </h3>
      <div className="input-grp">
        <input
          type="text"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder="Enter the recipe here"
        />
        <button onClick={() => foodfetch(keyWord)}>Find Recipe</button>
      </div>

      {alertmsg && <p className="alert-message">{alertmsg}</p>}
      <ul>
        {recipes.map((item, index) => {
          return (
            <li key={index}>
              <h3>{item.title}</h3>
              <h2>Spoonacular Recipe ID : {item.id}</h2>
              <div className="card-content">
                <img src={item.image} alt={item.title} />
                <div className="process-details">
                  <ProcessDetails
                    id={item.id}
                    spoonacularAPIKey={spoonacularAPIKey}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Function;
