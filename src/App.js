import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // 👈 we'll create this in Step 2

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
