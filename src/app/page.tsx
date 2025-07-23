import styles from "./page.module.css";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { pipeline, env } from "@xenova/transformers";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";

env.useBrowserCache = false;
env.allowLocalModels = true;

async function getEmbeddings(documents: Array<string>) {
  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  const embeddings = [];

  for (const document in documents) {
    const output = await embedder(document, {
        pooling: "mean",
        normalize: true,
      });
    embeddings.push(Array.from(output.data));
  }
  
  return embeddings;
}

function queryAI(model: ChatGroq, vectorStore: MemoryVectorStore) {
  async function query(prompt: FormData) {
    "use server"
    const RAG_TEMPLATE = `Your task is to answer the given questions about Kedar Panchal using only the provided context. Never include details not present in the provided context.
    If you don't know the answer, say "I don't know." Answer in complete sentences, and use as many examples from the context as possible.

    Question: {question}
    Context: {context}
    Answer:`;
    const rag_prompt = ChatPromptTemplate.fromTemplate(RAG_TEMPLATE);

  }

  return query
}

interface ChatbotProps {
  model: ChatGroq,
  vectorStore: MemoryVectorStore,
}
async function ChatbotInput({ model, vectorStore }: ChatbotProps) {
  return (
    <form action={queryAI(model, vectorStore)}>
      <input name="question"></input>
      <button type="submit">🔎</button>
    </form>
  );
} 

export default async function Home() {
  const loader = new DirectoryLoader("src/context", {
    ".txt": (path) => new TextLoader(path)
  });
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1024, chunkOverlap: 128
  })
  const documents = await loader.load();
  const splits = await splitter.splitDocuments(documents);

  const embeddings = {
    embedDocuments: getEmbeddings,
    embedQuery: async (query: string) => (await getEmbeddings([query]))[0],
  }
  const vectorStore = await MemoryVectorStore.fromDocuments(splits, embeddings);
  const model = new ChatGroq({
    model: "llama3-70b-8192",
    temperature: 0.7,
  });

  return (
    <div className={styles.page}>
      <div className={styles.chatbotInput}>
        <ChatbotInput 
          model={model} 
          vectorStore={vectorStore}
        />
      </div>
    </div>
  );
}
