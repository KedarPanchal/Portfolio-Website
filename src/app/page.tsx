"use client"

import styles from "./page.module.css";

import { ParticleBG } from "./components/particles";
import { Toolbar, scrollObserver, NavigationKey, NavigationRefs } from "./components/toolbar";
import { AboutMeBlock } from "./components/aboutme";
import { WorkExperienceBlock } from "./components/workexperience";
import { ChatbotBlock } from "./components/chatbot";
import { ProjectsBlock } from "./components/projects";
import { CertificationsBlock } from "./components/certifications";

import Image from "next/image";
import { useEffect, useRef } from "react";
import useWindowWidth from "./hooks/windowwidth";
import { env } from "@xenova/transformers";

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
    about: {
      element: <AboutMeBlock />,
      ref: useRef<HTMLElement>(null),
    },
    chatbot: {
      element: <ChatbotBlock />,
      ref: useRef<HTMLElement>(null),
    },
    experience: {
      element: <WorkExperienceBlock />,
      ref: useRef<HTMLElement>(null),
    },
    projects: {
      element: <ProjectsBlock />,
      ref: useRef<HTMLElement>(null),
    },
    certifications: {
      element: <CertificationsBlock />,
      ref: useRef<HTMLElement>(null),
    },
  }

  useEffect(() => {
    const pageObserver = scrollObserver(toolbarRef.current, sectionRefs, (target) => {
      if (width <= 500) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, (target) => {});

    toolbarRef.current!.querySelectorAll("span").forEach((span) => pageObserver.observe(span));
    return () => pageObserver.disconnect();
  }, [width]);

  return (
    <div className={styles.page} ref={mainPageRef}>
      <ParticleBG />
      <Toolbar root={mainPageRef} ref={toolbarRef} />
      {Object.keys(sectionRefs).map((id) => {
        return (
          <section id={id} ref={sectionRefs[id as NavigationKey].ref} key={id}>
            {sectionRefs[id as NavigationKey].element}
            <ScrollArrow />
          </section>
        );
      })}
    </div>
  );
}
