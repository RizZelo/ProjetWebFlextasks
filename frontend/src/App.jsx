import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero"
import HowItWorks from "./components/HowItWorks"
function App() {
  return (
    <>
    <NavBar />
    <Hero/>
    <HowItWorks/>
    </>
  );
}

export default App;
