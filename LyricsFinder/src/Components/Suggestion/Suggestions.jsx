import React, { useState } from "react";
import "./Sug.css";
function Suggestions(props) {
  return (
    <>
      {props.suggestionArray.length > 0 && (
        <div className="sug">
          <ul>
            {props.suggestionArray.map((suggestion, index) => {
              return (
                <li
                  key={index}
                  onClick={() =>
                    props.handleSugClick(
                      suggestion.title,
                      suggestion.artist.name
                    )
                  }
                >
                  {suggestion.title}-{suggestion.artist.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Suggestions;
