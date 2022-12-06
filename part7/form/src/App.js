import { useState } from "react";

const App = () => {
  const name = useField("text");
  const date = useField("date");
  const height = useField("text");

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...date} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {date.value} {height.value}
      </div>
    </div>
  );
};

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export default App;
