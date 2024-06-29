"use client"
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import { Spotlight } from "@/components/ui/Spotlight";
import { AuroraBackground } from "@/components/ui/aurora";
import { motion } from "framer-motion";



export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Landing/>
    </>
  );
}
