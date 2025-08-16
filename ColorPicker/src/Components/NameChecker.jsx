import React, { useEffect, useState } from "react";
import chroma from "chroma-js"; // convert rgb to hex
import namer from "color-namer"; // hex to naming
import "../Css/NameChecker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NameChecker(props) {
  useEffect(() => {
    try {
      if (props.rgb) {
        const rgbToHex = chroma(props.rgb).hex();
        const hexToName = namer(rgbToHex).basic[0].name.toUpperCase();

        toast.info(
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>
              {hexToName} | {props.rgb.toUpperCase()} | {rgbToHex}
            </span>
            <button
              style={{
                padding: "5px 10px",
                marginLeft: "auto",
                backgroundColor: rgbToHex,
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  `${hexToName} | ${props.rgb} | ${rgbToHex}`
                );
                toast.success(`${hexToName} Copied to clipboard!`, {
                  position: "top-left",
                });
              }}
            >
              Copy
            </button>
          </div>,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            style: {
              width: "500px",
              fontSize: "18px",
              padding: "15px 20px",
              height: "auto", // adjust height for inline content
              color: rgbToHex,
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [props.rgb]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default NameChecker;
