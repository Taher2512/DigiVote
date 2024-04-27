import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ParticleRing from "../components/Homepage/background/ParticleRing.js";
import Navbar from "../components/Homepage/foreground/Navbar.js";
import HeroHeading from "../components/Homepage/foreground/HeroHeading.js"
import Steps from "../components/Homepage/SecondPage/Steps.js"
import Features from "../components/Homepage/SecondPage/Features.js"
import Footer from "../components/Homepage/Footer.js";

export default function Home() {
  return (
    <>
      <main className="bg-[#0F172A] overflow-hidden">
        <div className="relative h-auto w-screen z-0">
          <ParticleRing />
          <div id="foreGround" className="absolute h-screen w-screen top-0 z-1">
            <Navbar />
            <HeroHeading />
          </div>
        </div>
        <Steps id="HowItWorks" />
        <Features id="features" />
        <Footer />
      </main>
    </>
  );
}
