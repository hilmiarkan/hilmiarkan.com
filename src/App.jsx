const title = "React";

function App() {
  return (
    <div>
      <h1>Hellooo {title}</h1>
      <label htmlFor="input">
        Type something
        <input id="input" type="text" />
      </label>
    </div>
  );
}

export default App;
