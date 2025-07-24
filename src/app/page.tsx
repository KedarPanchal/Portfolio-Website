import styles from "./page.module.css";

import { env } from "@xenova/transformers";
import { query } from "./actions/query";

env.allowLocalModels = true;

async function ChatbotInput() {
  return (
    <form action={query}>
      <input name="question"></input>
      <button type="submit">🔎</button>
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
