import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <About />
      <Education />
      <Skills/>
      <Experience/>
      <Contact/>
      <Footer/>
    </>
  );
}

export default App;
