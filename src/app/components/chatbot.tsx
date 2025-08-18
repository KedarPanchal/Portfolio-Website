import styles from "./chatbot.module.css";

import { useState } from "react";

import { FormEvent } from "react";

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
            
            const responsePromise = fetch("/api/query", {
                method: "POST",
                body: formData.get("question"),
            });
            const timeout = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Timed out after 15 seconds")), 15000);
            });
            Promise.race([responsePromise, timeout])
                .then(response => (response as Response).json())
                .then(json => setChatbotMessage(json.message))
                .catch(reject => setChatbotMessage(`${reject}`));
        } else {
            setChatbotMessage("");
            setChatbotQuestion((<p>{defaultString}</p>));
        }
    }

    return (
        <div className={styles.chatbotBlock}>
            <form onSubmit={getMessage} className={styles.chatbotInputForm}>
                <input name="question" type="search" autoComplete="off" className={styles.chatbotInputFormText}></input>
                <button type="submit" className={styles.chatbotInputFormButton}>{"↵"}</button>
            </form>  
            <div className={styles.chatbotOutput}>
                {chatbotQuestion}
                <p className={styles.chatbotOutputResponseText}>{chatbotMessage}</p>
            </div>
        </div>
    );
}
