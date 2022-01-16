import React from "react";
import "./App.css";
import TictacLayout from "./layout/tictac.layout";
import TictacPage from "./pages/tictac.page";

function App() {
  return (
    <TictacLayout>
      <TictacPage></TictacPage>
    </TictacLayout>
  );
}

export default App;
