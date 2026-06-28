import ParallaxHero from "./components/ParallaxHero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <ParallaxHero />
      <Marquee />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
