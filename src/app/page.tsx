"use client"

import styles from "./page.module.css";
import { ChatbotBlock } from "./components/chatbot";
import { AboutMeBlock } from "./components/aboutme";
import { env } from "@xenova/transformers";

env.allowLocalModels = true;

export default function Home() {
  return (
    <div className={styles.page}>
      <section id="about">
        <AboutMeBlock />
      </section>
      <section id="chatbot">
        <ChatbotBlock />  
      </section>
    </div>
  );
}
