import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import path from "path";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pipeline } from "@xenova/transformers";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import type { Document } from "@langchain/core/documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ConsoleCallbackHandler } from "@langchain/core/tracers/console";

import { NextResponse } from "next/server";

// Code to set up export
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

const contextPath = path.join(process.cwd(), "src", "context");

const loader = new DirectoryLoader(contextPath, {
    ".txt": (path) => new TextLoader(path)
});

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1024, chunkOverlap: 128
});

const documents = await loader.load();
const splits = await splitter.splitDocuments(documents);

const embeddings = {
    embedDocuments: getEmbeddings,
    embedQuery: async (query: string) => (await getEmbeddings([query]))[0],
}
const vectorStore = await MemoryVectorStore.fromDocuments(splits, embeddings);
const retriever = vectorStore.asRetriever({
    k: 10,
    searchType: "mmr",
    searchKwargs: {
        fetchK: 50,
        lambda: 0.9
    }
});

const model = new ChatGroq({
    model: "llama3-70b-8192",
    temperature: 0.4,
    maxTokens: 768,
});

// Export function
export async function POST(prompt: Request) {
    "use server"
    const RAG_TEMPLATE = `Your task is to answer the given questions about Kedar Panchal using only the provided context. Never include details not present in the provided context.
    Answer in complete sentences, and use as many examples from the context as possible. Use correct grammar.

    Question: {question}
    Context: {context}
    Answer:`;

    const rag_prompt = ChatPromptTemplate.fromTemplate(RAG_TEMPLATE);
    const chain = RunnableSequence.from([
      {
        context: retriever.pipe((documents: Document[]) => (documents.map(document => document.pageContent)).join("\n\n")),
        question: new RunnablePassthrough()
      },
      rag_prompt,
      model,
      new StringOutputParser()
    ]).withConfig({
        callbacks: [new ConsoleCallbackHandler()],
    });

    const text = await prompt.text()
    const answer = await chain.invoke(text);
    console.log(answer);
    return NextResponse.json({
        message: answer,
    });
  }
