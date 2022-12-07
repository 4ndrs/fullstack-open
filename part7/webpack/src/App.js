import React from "react";

const App = () => {
  const handleClick = async () => {
    console.log("wait 5 secs...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("done");
  };

  return (
    <div className="container" onClick={handleClick}>
      hello webpack
    </div>
  );
};

export default App;
