import styles from "./projects.module.css";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import githubLogo from "../../public/images/logos/githublogo.png";
import huggingfaceLogo from "../../public/images/logos/huggingfacelogo.png";
import gimpLogo from "../../public/images/logos/gimplogo.png";
import colabLogo from "../../public/images/logos/colablogo.webp";
import nextLogo from "../../public/images/logos/nextlogo.png";

interface ProjectWidgetProps {
    href: string,
    imageSrc: StaticImageData,
    altText?: string,
    widgetTitle: string,
    widgetDescription: string,
}
function ProjectWidget({href, imageSrc, altText="", widgetTitle, widgetDescription}: ProjectWidgetProps) {
    return (
        <Link href={href} target="_blank" className={styles.widgetBlock}>
            <div className={styles.widgetTop}>
                <Image src={imageSrc} alt={altText} className={styles.widgetImage}/>
                <h1 className={styles.widgetTitle}>{widgetTitle}</h1>
            </div>
            <div className={styles.widgetBottom}>
                <p className={styles.widgetDescription}>{widgetDescription}</p>
            </div>
        </Link>
    );
}

export function Projects() {
    return (
        <div className={styles.projectGrid}>
            <ProjectWidget 
                href={"https://colab.research.google.com/github/KedarPanchal/Breast-Cancer-Detector/blob/main/tumor_detector.ipynb"} 
                imageSrc={colabLogo} widgetTitle="EfficientNet&#8209;B1 Breast Cancer Detection Fine&#8209;Tune" 
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
                imageSrc={githubLogo} widgetTitle="lspp (ls++) CLI Tool" 
                widgetDescription="An improved form of the ls command that lists files in a tree-style structure. Built with Java and Maven and compiled to run natively with GraalVM." 
            />
        </div>
    );
}
