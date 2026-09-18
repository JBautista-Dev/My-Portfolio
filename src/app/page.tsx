import ParallaxHero from "./components/ParallaxHero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

// Rebuild the page hourly so Supabase edits show up without a redeploy.
// Next requires a literal here. Keep in sync with CONTENT_REVALIDATE
// in src/lib/supabase.ts.
export const revalidate = 3600;

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
