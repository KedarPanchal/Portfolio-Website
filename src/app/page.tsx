"use client"

import styles from "./page.module.css";

import { Toolbar } from "./components/toolbar";
import { AboutMeBlock } from "./components/aboutme";
import { ChatbotBlock } from "./components/chatbot";
import { Projects } from "./components/project";

import { useRef } from "react";

import { env } from "@xenova/transformers";

env.allowLocalModels = true;

export default function Home() {
  const mainPageRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.page} ref={mainPageRef}>
      <Toolbar root={mainPageRef}/>
      <section id="about">
        <AboutMeBlock />
      </section>
      <section id="chatbot">
        <ChatbotBlock />  
      </section>
      <section id="experience">

      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="certifications">
      
      </section>
    </div>
  );
}
