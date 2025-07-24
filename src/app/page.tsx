import styles from "./page.module.css";

import { env } from "@xenova/transformers";
import { query } from "./actions/query";

env.allowLocalModels = true;

async function ChatbotInput() {
  return (
    <form action={query} className={styles.chatbotInputForm}>
      <input name="question" type="search" autoComplete="off" className={styles.chatbotInputText}></input>
      <button type="submit" className={styles.chatbotInputButton}>{">"}</button>
    </form>
  );
} 

export default async function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.chatbotInput}>
        <ChatbotInput />
      </div>
    </div>
  );
}
