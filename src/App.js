import { useState } from "react";

import LocalToggle from "./LocalToggle";
import UploadImageToS3WithNativeSdk from "./uploadImageToS3WithNativeSdk";
// import DeleteObject from "./deleteObject";

function App() {
  const [globalToggle, setGlobalToggle] = useState(false);

  const globalToggleHandler = () => {
    setGlobalToggle(!globalToggle);
  };

  return (
    <div>
      <h1>Full S3 CRUD App with React</h1>

      {/* Global Toggle */}
      <button
        id="global__toggle__button"
        onClick={globalToggleHandler}
        style={{
          backgroundColor: globalToggle ? "red" : "white",
          color: globalToggle ? "white" : "black",
          padding: "0.5rem",
        }}
      >
        <b>Global Toggle:</b>
        {globalToggle ? " ON" : " OFF"}
      </button>

      {globalToggle ? <p>Global Toggle is ON</p> : null}

      {/* Local Toggle using component */}
      {/* disable even numbered buttons */}

      <hr />
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          id={`local__toggle__button__${i}`}
          disabled={i % 2 === 0}
          onClick={() => console.log(`Local Toggle Button ${i} clicked.`)}
        >
          {/* if disabled, grey out component */}
          {i % 2 === 0 ? (
            <div
              style={{
                // backgroundColor: "grey",
                // color: "white",
                padding: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <b>Local Toggle Button {i}:</b> Disabled
            </div>
          ) : (
            <LocalToggle i={i} />
          )}
        </div>
      ))}
      <hr />

      <UploadImageToS3WithNativeSdk />
      {/* <DeleteObject /> */}
    </div>
  );
}

export default App;
