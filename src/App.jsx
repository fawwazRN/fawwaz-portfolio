import AboutMe from "./components/AboutMe";
import Achievement from "./components/Achivement";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MyProject from "./components/MyProject";
import MySkills from "./components/MySkills";
import Timeline from "./components/Timeline";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <AboutMe />
      <MySkills />
      <MyProject />
      <Timeline />
      <Achievement />
      <Contact />
    </>
  );
}

export default App;
