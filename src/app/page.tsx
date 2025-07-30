"use client"

import styles from "./page.module.css";
import { env } from "@xenova/transformers";
import { useState } from "react";

env.allowLocalModels = true;

function ChatbotBlock() {
  const [chatbotQuestion, setChatbotQuestion] = useState((<p>I'm Kedar's AI assistant, ready to talk about his resume and work experience! Please ask me a question!</p>));
  const [chatbotMessage, setChatbotMessage] = useState("");

  async function getMessage(formData: FormData) {
    const response = await fetch("/api/query", {
      method: "POST",
      body: formData.get("question"),
    });

    const responseJSON = await response.json();
    setChatbotMessage(responseJSON.message);
    if (formData.get("question")) {
      setChatbotQuestion((<p><b>You Asked: </b>{formData.get("question")! as string}</p>));
    } else {
      setChatbotMessage("");
      setChatbotQuestion((<p>I'm Kedar's AI assistant, ready to talk about his resume and work experience! Please ask me a question!</p>));
    }
  }

  return (
    <div className={styles.chatbotBlock}>
      <form action={getMessage} className={styles.chatbotInputForm}>
        <input name="question" type="search" autoComplete="off" className={styles.chatbotInputText}></input>
        <button type="submit" className={styles.chatbotInputButton}>{"↵"}</button>
      </form>  
      <div className={styles.chatbotOutput}>
        {chatbotQuestion}
        <span></span>
        <p className={styles.chatbotOutputResponse}>{chatbotMessage}</p>
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
