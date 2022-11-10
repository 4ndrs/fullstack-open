import { useState } from "react";

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log("value now", newValue); // print the new value to the console
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>thousand</button>
      <button onClick={() => setToValue(0)}>reset</button>
      <button onClick={() => setToValue(value + 1)}>increment</button>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

export default App;
