"use client"

import styles from "./page.module.css";

import { useRef } from "react";
import { JSX } from "react";

import Image from "next/image";

import { ParticleBG } from "./components/particles";

import { env } from "@xenova/transformers";

import { useWindowWidth } from "./hooks/windowwidth";
import { useScrollObserver } from "./hooks/scrollobserver";
import { NavigationKey, NavigationRefs } from "./hooks/scrollobserver";

import { Toolbar } from "./components/toolbar";
import { AboutMeBlock } from "./components/aboutme";
import { WorkExperienceBlock } from "./components/workexperience";
import { ChatbotBlock } from "./components/chatbot";
import { ProjectsBlock } from "./components/projects";
import { CertificationsBlock } from "./components/certifications";

import scrollArrow from "../public/images/scrollarrow.png";

env.allowLocalModels = true;

function ScrollArrow() {
  return (
      <Image src={scrollArrow} alt="" className={styles.scrollArrow} />
  );
}

export default function Home() {
  const width = useWindowWidth();
  const mainPageRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLElement>(null);

  const sectionRefs: NavigationRefs = {
    about: useRef<HTMLElement>(null),
    chatbot: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    certifications: useRef<HTMLElement>(null),
  }

  const sectionContent: Record<NavigationKey, JSX.Element> = {
    about: <AboutMeBlock />,
    chatbot: <ChatbotBlock />,
    experience: <WorkExperienceBlock />,
    projects: <ProjectsBlock />,
    certifications: <CertificationsBlock />,
  }

  useScrollObserver(
    "span",
    toolbarRef,
    sectionRefs,
    {
      intersect: (target: HTMLElement) => {
        if (width <= 500) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    },
    [width],
  );

  return (
    <div className={styles.page} ref={mainPageRef}>
      <ParticleBG />
      <Toolbar root={mainPageRef} ref={toolbarRef} />
      {Object.keys(sectionRefs).map((id) => {
        return (
          <section id={id} ref={sectionRefs[id as NavigationKey]} key={id}>
            {sectionContent[id as NavigationKey]}
            <ScrollArrow />
          </section>
        );
      })}
    </div>
  );
}
