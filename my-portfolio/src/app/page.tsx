import ParallaxHero from "./components/ParallaxHero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <ParallaxHero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
