import React from "react";
import "./App.css";
import TictacLayout from "./layout";
import TictacPage from "./pages";

function App() {
  return (
    <TictacLayout>
      <TictacPage></TictacPage>
    </TictacLayout>
  );
}

export default App;
