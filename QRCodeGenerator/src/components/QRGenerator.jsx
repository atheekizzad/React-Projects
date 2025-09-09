import React, { useState } from "react";
import colornames from "colornames";
import "./QRGenerator.css";
import { FaQrcode, FaMagic } from "react-icons/fa"; // QR and magic wand icons

function QRGenerator() {
  const [qr, setQr] = useState("");
  const [name, setName] = useState("");
  const [dimension, setDimension] = useState(400);
  const [FGColor, setFGColor] = useState("");
  const [alert, setAlert] = useState("");
  const [hexfg, sethexfg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const qrfetch = async (word, size, fgColor) => {
    setAlert("");
    setQr("");
    try {
      const res = await fetch(
        //GoQR API
        `https://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&color=${fgColor}`
      );
      if (!res.ok) {
        throw new Error(res.status);
      } else {
        const data = await res.blob(); //converts the response into a Blob object, which is like a file in memory.
        //It’s a way for JavaScript to represent raw binary data in memory, almost like a file, but it doesn’t have to exist on disk.
        // /You can think of it as a container for images, videos, PDFs, or any binary data.
        /*When you fetch a URL that returns a file or image, the data comes over the network as raw bytes. 
        The browser needs to convert that into something usable:
        res.text() → interprets bytes as a UTF-8 string.
        res.json() → inerprets bytes as JSON.
        res.blob() → keeps the raw binary intact, perfect for files, images, PDFs, or any media. */
        const imgUrl = URL.createObjectURL(data);
        /*URL.createObjectURL(data) is how you turn a Blob into something the browser can actually display or download. */
        //Creates a temporary local URL (like blob:http://localhost/...) that points to the binary data.
        setQr(imgUrl);
        setTimeout(() => URL.revokeObjectURL(imgUrl), 10000);
        /*Each time you call URL.createObjectURL, it keeps the blob in memory until revoked. Add cleanup:
        This prevents memory bloat after many QR generations. */
        setIsLoading(false);
      }
    } catch (err) {
      console.error(`Error :${err}`);
      setAlert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFG = (e) => {
    const input = e.target.value;
    setFGColor(input);
    const shade = colornames(input.toLowerCase());
    if (shade) {
      sethexfg(shade.slice(1));
    } else {
      sethexfg("");
    }
  };

  const handleClick = () => {
    if (!name || !dimension || !FGColor) {
      setAlert("Fill Out All the Fields");
      setQr("");
      return;
    } else if (!hexfg) {
      setAlert("Hex Code Not Valid For Your Input Colors");
      return;
    } else {
      setIsLoading(true);
      qrfetch(name, dimension, hexfg);
    }
  };

  return (
    <>
      {" "}
      <header className="header">
        <h1>
          <FaQrcode className="icon" /> QR Code Generator{" "}
          <FaMagic className="icon" />
        </h1>
        <p>Generate custom QR codes instantly with style!</p>
      </header>{" "}
      <div className={`container ${qr ? "generated" : ""}`}>
        <div className="section1">
          {" "}
          <label htmlFor="name">Enter your Content to Encode</label>
          <textarea
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            rows="5"
          />
          <label htmlFor="size">Enter the Size (Width & Height) in px</label>
          <input
            type="number"
            value={dimension}
            id="size"
            onChange={(e) => setDimension(Number(e.target.value))}
            min="1"
            max="1000"
          />
          <label htmlFor="fgColor">Enter the Foreground Color</label>
          <input type="text" value={FGColor} onChange={handleChangeFG} />
          <button onClick={handleClick} disabled={isLoading}>
            {isLoading ? (
              <>
                Generating
                <span className="spinner"></span>
              </>
            ) : (
              "Generate"
            )}
          </button>
        </div>

        <div className="section2">
          {alert && <h3>{alert}</h3>}
          {qr && (
            <div className="download">
              <img src={qr} alt="QR Code" />
              <a href={qr} download="QRGenerator.png">
                Download
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default QRGenerator;
