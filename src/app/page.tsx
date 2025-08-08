"use client"

import styles from "./page.module.css";

import { ParticleBG } from "./components/particles";
import { Toolbar } from "./components/toolbar";
import { AboutMeBlock } from "./components/aboutme";
import { WorkExperienceBlock } from "./components/workexperience";
import { ChatbotBlock } from "./components/chatbot";
import { ProjectsBlock } from "./components/projects";
import { CertificationsBlock } from "./components/certifications";

import Image from "next/image";
import { useRef } from "react";
import { env } from "@xenova/transformers";

import scrollArrow from "../public/images/scrollarrow.png";

env.allowLocalModels = true;

function ScrollArrow() {
  return (
      <Image src={scrollArrow} alt="" className={styles.scrollArrowImage} />
  );
}

export default function Home() {
  const mainPageRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.page} ref={mainPageRef}>
      <ParticleBG />
      <Toolbar root={mainPageRef}/>
      <section id="about">
        <AboutMeBlock />
        <ScrollArrow />
      </section>
      <section id="chatbot">
        <ChatbotBlock />  
        <ScrollArrow />
      </section>
      <section id="experience">
        <WorkExperienceBlock />
        <ScrollArrow />
      </section>
      <section id="projects">
        <ProjectsBlock />
        <ScrollArrow />
      </section>
      <section id="certifications">
        <CertificationsBlock />
      </section>
    </div>
  );
}
