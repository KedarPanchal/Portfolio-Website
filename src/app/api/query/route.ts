import path from "path";

import { NextResponse } from "next/server";

import { ChatPromptTemplate } from "@langchain/core/prompts";
import type { Document } from "@langchain/core/documents";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ConsoleCallbackHandler } from "@langchain/core/tracers/console";
import { ChatGroq } from "@langchain/groq";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { pipeline } from "@xenova/transformers";

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

const embeddings = {
    embedDocuments: getEmbeddings,
    embedQuery: async (query: string) => (await getEmbeddings([query]))[0],
}

const retriever = await loader.load()
    .then(documents => splitter.splitDocuments(documents))
    .then(splits => MemoryVectorStore.fromDocuments(splits, embeddings))
    .then(vectorStore => vectorStore.asRetriever({
        k: 10,
        searchType: "mmr",
        searchKwargs: {
            fetchK: 50,
            lambda: 0.9,
        }
    }));

const model = new ChatGroq({
    model: "llama3-70b-8192",
    temperature: 0.4,
    maxTokens: 1024,
});

// Export function
export async function POST(prompt: Request) {
    "use server"
    const RAG_TEMPLATE = `Your task is give detailed answers to the given questions about Kedar Panchal in a friendly and approachable tone using only the provided context. Never include details not present in the provided context.
    Never give incorrect information from the context. Answer in complete sentences, and use as many examples from the context as possible. Use correct grammar and answer only in paragraph form.

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

    const answer = await prompt.text().then(text => chain.invoke(text));
    return NextResponse.json({
        message: answer,
    });
  }
