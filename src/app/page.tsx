"use client"

import styles from "./page.module.css";

import { Toolbar } from "./components/toolbar";
import { AboutMeBlock } from "./components/aboutme";
import { ChatbotBlock } from "./components/chatbot";
import { ProjectWidget } from "./components/projectwidget";

import githubLogo from "../public/images/githublogo.png";
import huggingfaceLogo from "../public/images/huggingfacelogo.png";
import gimpLogo from "../public/images/gimplogo.png";
import colabLogo from "../public/images/colablogo.webp";
import nextLogo from "../public/images/nextlogo.png";

import { useRef } from "react";

import { env } from "@xenova/transformers";

env.allowLocalModels = true;

export default function Home() {
  const mainPageRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.page} ref={mainPageRef}>
      <Toolbar root={mainPageRef}/>
      <section id="about">
        <AboutMeBlock />
      </section>
      <section id="chatbot">
        <ChatbotBlock />  
      </section>
      <section id="experience">

      </section>
      <section id="projects">
        <div className={styles.projectGrid}>
          <ProjectWidget 
            href={"https://colab.research.google.com/github/KedarPanchal/Breast-Cancer-Detector/blob/main/tumor_detector.ipynb"} 
            imageSrc={colabLogo} widgetTitle="Fine&#8209;Tuning EfficientNet&#8209;B1 for Breast Cancer Detection" 
            widgetDescription="A Jupyter notebook for quickly fine&#8209;tuning EfficientNet&#8209;B1 to classify breast tumors in ultrasounds as malignant or benign." 
          />
          <ProjectWidget 
            href={"https://huggingface.co/KedarPanchal/flan-t5-small-summary-finetune"} 
            imageSrc={huggingfaceLogo} widgetTitle="FLAN&#8209;T5&#8209;Small Summarization Fine&#8209;Tune" 
            widgetDescription="A fine&#8209;tuned Flan&#8209;T5&#8209;small model trained with LoRA on research paper abstracts to generate summaries using Hugging Face Transformers." 
          />
          
          <ProjectWidget 
            href={"https://github.com/KedarPanchal/GIMP-AI-Inpainting"} 
            imageSrc={gimpLogo} widgetTitle="GIMP AI Inpainting Plug&#8209;In" 
            widgetDescription="An AI Inpainting plug&#8209;in for GIMP 3.0 that allows users to locally leverage powerful AI tools like Stable Diffusion XL to upgrade their image&#8209;editing workflow." 
          />
          <ProjectWidget 
            href={"https://github.com/Sinistral-Synths/Whiplash"} 
            imageSrc={githubLogo} widgetTitle="Whiplash Harsh Noise Synthesizer" 
            widgetDescription="A VST3-compatible harsh noise synth featuring an Attack-Decay-Sustain-Release envelope, pitch modulation, and five distortion effects." 
          />
          <ProjectWidget 
            href={"https://github.com/KedarPanchal/Portfolio-Website"} 
            imageSrc={nextLogo} widgetTitle="Kedar's Portfolio Site" 
            widgetDescription="A NextJS and React portfolio website with an integrated, RAG-powered AI Assistant powered by Llama3&#8209;70b and langchain.js." 
          />
          <ProjectWidget 
            href={"https://github.com/KedarPanchal/LSPP"} 
            imageSrc={githubLogo} widgetTitle="lspp (ls++)" 
            widgetDescription="An improved form of the ls command that lists files in a tree-style structure. Built with Java and Maven and compiled to run natively with GraalVM." 
          />
        </div>
      </section>
      <section id="certifications">

      </section>
    </div>
  );
}
