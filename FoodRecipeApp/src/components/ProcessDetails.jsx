import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import "./ProcessDetails.css";

function ProcessDetails(props) {
  const [process, setProcess] = useState({});
  const [alertmsg, setAlertmsg] = useState("");

  const recipeProcess = async (recipeId) => {
    setAlertmsg("");
    //calling the Recipe Information Endpoint:
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${props.spoonacularAPIKey}&includeNutrition=false`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(res.status);
      } else {
        const data = await res.json();
        const instructions = data.instructions;
        if (!instructions || instructions.trim().length === 0) {
          setAlertmsg("No Instructions Found");
        } else {
          setProcess((prev) => ({
            ...prev,
            [recipeId]: instructions,
          }));

          setAlertmsg("");
        }
      }
    } catch (err) {
      console.error(err);
      setAlertmsg("Error Fetching Recipe Details.");
      setTimeout(() => {
        setAlertmsg("");
      }, 2000);
    }
  };
  useEffect(() => {
    recipeProcess(props.id);
  }, [props.id]);

  return (
    <div className="process-details-container">
      {alertmsg && <p className="loading-message">{alertmsg}</p>}
      {process[props.id] && (
        <div className="instructions-list">{parse(process[props.id])}</div>
      )}
    </div>
  );
}

export default ProcessDetails;
