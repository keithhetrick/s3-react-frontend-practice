import { useState } from "react";

// pass unique ID props from App.js, then pass up toggle state as props to App.js
// pass up isOn state as props to App.js

function LocalToggle({ i }) {
  const [isOn, setIsOn] = useState(false);

  const toggleLocalClick = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleLocalClick}
        style={{
          backgroundColor: isOn ? "red" : "white",
          color: isOn ? "white" : "black",
          padding: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        <b>Local Toggle Button {i}:</b>
        {isOn ? " On" : " Off"}
      </button>
      <div>{isOn ? <p>Local Toggle {i} is ON</p> : null}</div>
    </div>
  );
}

export default LocalToggle;
