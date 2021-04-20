import React from "react";
import Autocomplete from "./components/AutoComplete";

function App2() {
    return (
      <div>
        <h1>React Autocomplete Demo</h1>
        <h2>Start typing and experience the autocomplete wizardry!</h2>
        <Autocomplete suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango", "Annesi"]}/>
      </div>
    );
  }

export default App2