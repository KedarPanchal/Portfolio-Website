"use client"

import styles from "./page.module.css";
import { env } from "@xenova/transformers";
import { useState } from "react";

env.allowLocalModels = true;

function ChatbotBlock() {
  const [chatbotQuestion, setChatbotQuestion] = useState("Please ask a question!");
  const [chatbotMessage, setChatbotMessage] = useState("");

  async function getMessage(formData: FormData) {
    const response = await fetch("/api/query", {
      method: "POST",
      body: formData.get("question"),
    });

    const responseJSON = await response.json();
    if (formData.get("question") != null) {
      setChatbotQuestion(formData.get("question")! as string);
    }
    setChatbotMessage(responseJSON.message);;
  }

  return (
    <div className={styles.chatbotBlock}>
      <form action={getMessage} className={styles.chatbotInputForm}>
        <input name="question" type="search" autoComplete="off" className={styles.chatbotInputText}></input>
        <button type="submit" className={styles.chatbotInputButton}>{"↵"}</button>
      </form>  
      <div className={styles.chatbotOutputText}>
        <p><b>Question: </b>{chatbotQuestion}</p>
        <p>{chatbotMessage}</p>
      </div>
      
    </div>
    
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <ChatbotBlock />
    </div>
  );
}
