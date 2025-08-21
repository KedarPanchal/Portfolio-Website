import styles from "./chatbot.module.css";

import { useState } from "react";

import { FormEvent } from "react";
import Scrollbar from "react-scrollbars-custom";

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
            setChatbotQuestion((<p className={styles.chatbotOutputQuestionText}><b>You Asked: </b>{formData.get("question")! as string}</p>));

            setChatbotMessage(generationIndicators[Math.floor(Math.random() * generationIndicators.length)]);
            const abortController = new AbortController();
            const responsePromise = fetch("/api/query", {
                method: "POST",
                body: formData.get("question"),
                signal: abortController.signal,
            });
            const timeout = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Timed out after 15 seconds")), 15000);
            });
            Promise.race([responsePromise, timeout])
                .then(response => (response as Response).json())
                .then(json => setChatbotMessage(json.message))
                .catch(reject => {
                    abortController.abort();
                    setChatbotMessage(`${reject}`);
                });
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
            <Scrollbar 
                className={styles.chatbotOutput}
                trackYProps={{
                    style: {
                        background: "transparent",
                        width: "0.4vmax",
                    }
                }}
                thumbYProps={{
                    style: {
                        background: "#EDEDED",
                    }
                }}
            >
                {chatbotQuestion}
                <p className={styles.chatbotOutputResponseText}>{chatbotMessage}</p>
            </Scrollbar>
        </div>
    );
}
