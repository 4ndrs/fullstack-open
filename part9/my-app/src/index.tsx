import ReactDOM from "react-dom/client";

const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}</h1>;
};

const element = <Welcome name="Ichigo" />;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  element
);
