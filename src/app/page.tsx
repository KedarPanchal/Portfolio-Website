"use client"

import styles from "./page.module.css";
import { ChatbotBlock } from "./components/chatbot";
import { env } from "@xenova/transformers";

env.allowLocalModels = true;

export default function Home() {
  return (
    <div className={styles.page}>
      <section>
        <ChatbotBlock />  
      </section>
    </div>
  );
}
