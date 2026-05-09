import Hero from "./sections/Hero";
import AboutIllumine from "../components/about/AboutIllumine";
import AboutDepartment from "@/components/about/AboutDepartment";
import GoodwillMessage from "./sections/GoodwillMessage";
import About from "./sections/About";
import Goodwill from "./sections/Goodwill";
import Event from "./sections/Event";


/**
 * MODULE: Home Route (/)
 * * DESCRIPTION:
 * This is the root page for the Illumine 2026 application. 
 */
export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      <AboutIllumine />
      {/* <AboutDepartment /> */}
      <About />
      {/* <Goodwill /> */}
      <GoodwillMessage />

    </div>
  );
}