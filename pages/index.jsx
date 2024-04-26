import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ParticleRing from "../components/Homepage/background/ParticleRing";
import Navbar from "../components/Homepage/foreground/Navbar.jsx";
import HeroHeading from "../components/Homepage/foreground/HeroHeading"

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
      </main>
    </>
  )

  
}
