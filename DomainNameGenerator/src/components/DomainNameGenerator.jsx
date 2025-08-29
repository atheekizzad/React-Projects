import React, { useEffect, useState } from "react";
import startupNameGenerator from "@rstacruz/startup-name-generator";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import "./DomainNameGenerator.css";

function DomainNameGenerator() {
  const [name, setName] = useState("");
  const [generateName, setGeneratenames] = useState([]);
  const [errors, setErrors] = useState("");
  const [favourites, setFavourites] = useState([]);
  const domainNamePurchase =
    "https://www.namecheap.com/domains/registration/results/?domain=";
  const [isListening, setIsListening] = useState(false);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition; //Checks if the browser provides a speech recognition API.
    if (!SpeechRecognition) {
      toast.error("Your browser does not support Speech Recognition");
      return;
    } else {
      const recognition = new SpeechRecognition(); //Creates a new speech recognition object (recognition) from the API.
      setIsListening(true);
      recognition.start(); /*Starts the microphone listening process.
      Now the browser will capture the user’s speech until it thinks the phrase is complete. */
      recognition.onresult = (e) => {
        const spokenText = e.results[0][0].transcript;

        setName(spokenText);
      };
      recognition.onerror = (e) => {
        setErrors(`Speech recognition error : ${e.error}`);
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };
  const GenerateDomainName = () => {
    try {
      if (name.trim() === "") {
        return;
      } else {
        const generatedNamesArray = startupNameGenerator(name);
        setGeneratenames(generatedNamesArray);
        setErrors("");
      }
    } catch (err) {
      setErrors(`An error occurred while generating the name: ${err.message}`);
    }
  };

  useEffect(() => {
    GenerateDomainName();
    if (name.length === 0) {
      setGeneratenames([]);
    }
  }, [name]);

  const handleAddToFavourites = (genName) => {
    if (!favourites.includes(genName)) {
      setFavourites((prev) => [...prev, genName]);
      toast.success(`Added ${genName} to favourites!`);
    } else {
      toast(`${genName} Already in favourites`);
      return;
    }
  };

  const handleRemoveFav = (genName) => {
    setFavourites((prev) => prev.filter((item) => item !== genName));
    toast(`${genName} Removed from favourites`, {
      icon: "🗑️",
      style: {
        background: "linear-gradient(135deg, #ef4444, #f87171)",
        color: "#fff",
        fontSize: "20px",
      },
    });
  };
  const handleCopy = (genName) => {
    navigator.clipboard.writeText(genName);
    toast.success(`Copied to Clipboard "${genName}"!`);
  };

  return (
    <div className="container">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Default options
          style: {
            borderRadius: "10px",
            padding: "12px 20px",
            color: "#fff",
            fontWeight: "500",
            fontSize: "0.95rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          },
          duration: 4000, // toast disappears after 4s
          success: {
            style: {
              background: "linear-gradient(135deg, #0ea472ff, #89e105ff)",
              color: "#fff",
              fontSize: "20px",
            },
            icon: "✅", // emoji or text icon
          },
          error: {
            style: {
              background: "linear-gradient(135deg, #130457ff, #f87171)",
              color: "#fff",
              fontSize: "20px",
            },
            icon: "❌",
          },
          // Optional: info or custom
          // info: { style: { background: '#3b82f6', color: '#fff' }, icon: 'ℹ️' },
        }}
      />
      <h2>
        🌐 Domain Name Generator ✨{" "}
        <span className="sub">With JS Libraries</span>
      </h2>
      <div className="input">
        <input
          type="text"
          onChange={handleInputChange}
          value={name}
          placeholder="Enter the Keywords....."
        />
        <button
          className="speak-btn"
          onClick={handleVoiceInput}
          disabled={isListening}
        >
          {isListening ? "🔊" : "🎤"}
        </button>
      </div>
      {errors && <h3 className="error">{errors}</h3>}
      <div className="main-content">
        {" "}
        <div className="generated-grid">
          {generateName.length === 0 ? (
            <p></p>
          ) : (
            generateName.map((gen, index) => {
              return (
                <div key={index}>
                  <a
                    target="_blank"
                    href={`${domainNamePurchase}${gen}`}
                    rel="noreferrer"
                  >
                    {gen}
                  </a>

                  <button className="copy-btn" onClick={() => handleCopy(gen)}>
                    Copy
                  </button>
                  {favourites.includes(gen) ? (
                    <button
                      className="rem-btn"
                      onClick={() => handleRemoveFav(gen)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToFavourites(gen)}
                      className="fav-btn"
                    >
                      Add to Favourites
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
        {favourites.length === 0 ? (
          <></>
        ) : (
          <div className="favourites-grid">
            <>
              <h3>Favourites Domain Names</h3>
              {favourites.map((fav, index) => {
                return (
                  <div key={index}>
                    <a
                      target="_blank"
                      href={`${domainNamePurchase}${fav}`}
                      rel="noreferrer"
                    >
                      {fav}
                    </a>
                  </div>
                );
              })}
            </>
          </div>
        )}
      </div>
    </div>
  );
}

export default DomainNameGenerator;
