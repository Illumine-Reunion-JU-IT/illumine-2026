import Hero from "./sections/Hero";
import AboutIllumine from "../components/about/AboutIllumine";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutIllumine />
    </div>
  );
}
