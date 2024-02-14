import "./App.css";
import Example from "./example/Example";
import LoginForm from "./example/LoginForm";

function App() {
  return (
    <div>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <Example />
      <br />
      <hr />
      <br />
      <LoginForm />
    </div>
  );
}

export default App;
