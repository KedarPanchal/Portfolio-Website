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

export function ProjectsBlock() {
    type Project = {
        link: string;
        image: StaticImageData;
        title: string,
        description: string;
    }

    const projectsArray: Project[] = [
        // The hypens used have an HTML alias of &#8209; and are non-breaking hyphens 
        {
            link: "https://colab.research.google.com/github/KedarPanchal/Breast-Cancer-Detector/blob/main/tumor_detector.ipynb", 
            image: colabLogo, 
            title: "EfficientNet‑B1 Breast Cancer Detection Fine‑Tune",
            description: "A Jupyter notebook for quickly fine‑tuning EfficientNet‑B1 to classify breast tumors in ultrasounds as malignant or benign."
        },
        {
            link: "https://huggingface.co/KedarPanchal/flan-t5-small-summary-finetune", 
            image: huggingfaceLogo, 
            title: "FLAN‑T5‑Small Summarization Fine‑Tune",
            description: "A fine‑tuned Flan‑T5‑small model trained with LoRA on research paper abstracts to generate summaries using Hugging Face Transformers.",
        },
        {
            link: "https://github.com/KedarPanchal/GIMP-AI-Inpainting",
            image: gimpLogo,
            title: "GIMP AI Inpainting Plug‑In",
            description: "An AI Inpainting plug‑in for GIMP 3.0 that allows users to locally leverage powerful AI tools like Stable Diffusion XL to upgrade their image‑editing workflow.",
        },
        {
            link: "https://github.com/Sinistral-Synths/Whiplash",
            image: githubLogo,
            title: "Whiplash Harsh Noise Synthesizer",
            description: "A VST3-compatible harsh noise synth featuring an Attack-Decay-Sustain-Release envelope, pitch modulation, and five distortion effects.",
        },
        {
            link: "https://github.com/KedarPanchal/Portfolio-Website",
            image: nextLogo,
            title: "Kedar's Portfolio Site",
            description: "A Next.js and React portfolio website with an integrated, RAG-powered AI Assistant powered by Llama3‑70b and langchain.js.",
        },
        {
            link: "https://github.com/KedarPanchal/LSPP",
            image: githubLogo,
            title: "lspp (ls++) CLI Tool",
            description: "An improved form of the ls command that lists files in a tree-style structure. Built with Java and Maven and compiled to run natively with GraalVM.",
        }
    ];
    return (
        <div className={styles.projectGrid}>
            {projectsArray.map((project, i) => {
                return <ProjectWidget href={project.link} imageSrc={project.image} widgetTitle={project.title} widgetDescription={project.description} key={i}/>
            })}
        </div>
    );
}
