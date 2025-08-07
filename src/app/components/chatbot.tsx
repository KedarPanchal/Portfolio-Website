import styles from "./chatbot.module.css";
import { FormEvent, useState } from "react";

export function ChatbotBlock() {
    const defaultString = "I'm Kedar's AI assistant, ready to talk about his resume and work experience. Let me know how I can help!";
    const [chatbotQuestion, setChatbotQuestion] = useState((<p>{defaultString}</p>));
    const [chatbotMessage, setChatbotMessage] = useState("");

    const generationIndicators = [
        "Thinking...",
        "Generating...",
        "Reviewing Kedar's experience...",
        "Scanning experience for context...",
        "Fetching resume insights...",
        "Analyzing your question...",
        "Identifying relevant information...",
        "Consulting vector store...",
        "Querying knowledge base...",
        "Evaluating embeddings...",
        "Pursuing relevant highlights...",
    ];

    async function getMessage(event: FormEvent<HTMLFormElement>) { 
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (formData.get("question")) {
            setChatbotQuestion((<p><b>You Asked: </b>{formData.get("question")! as string}</p>));

            setChatbotMessage(generationIndicators[Math.floor(Math.random() * generationIndicators.length)]);
            const response = await fetch("/api/query", {
                method: "POST",
                body: formData.get("question"),
            });

            const responseJSON = await response.json();
            setChatbotMessage(responseJSON.message);
        } else {
            setChatbotMessage("");
            setChatbotQuestion((<p>{defaultString}</p>));
        }
    }

    return (
        <div className={styles.chatbotBlock}>
            <form onSubmit={getMessage} className={styles.chatbotInputForm}>
                <input name="question" type="search" autoComplete="off" className={styles.chatbotInputText}></input>
                <button type="submit" className={styles.chatbotInputButton}>{"↵"}</button>
            </form>  
            <div className={styles.chatbotOutput}>
                {chatbotQuestion}
                <p className={styles.chatbotOutputResponse}>{chatbotMessage}</p>
            </div>
        </div>
    );
}
