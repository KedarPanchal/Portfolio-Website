import styles from "./projects.module.css";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import link from "../../public/images/link.png";
import githubLogo from "../../public/images/logos/githublogo.png";
import huggingfaceLogo from "../../public/images/logos/huggingfacelogo.png";
import gimpLogo from "../../public/images/logos/gimplogo.png";
import colabLogo from "../../public/images/logos/colablogo.png";
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
        <Link href={href} target="_blank" className={styles.projectWidgetBlock}>
            <div className={styles.projectWidgetTop}>
                <Image src={imageSrc} alt={altText} className={styles.projectWidgetImage}/>
                <h1 className={styles.projectWidgetTitle}>{widgetTitle} <span className={styles.projectWidgetLink}><Image src={link} alt="" className={styles.projectWidgetLinkImage} /></span></h1>
            </div>
            <div className={styles.projectWidgetBottom}>
                <p className={styles.projectWidgetDescription}>{widgetDescription}</p>
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
            title: "EfficientNet‑B1 Cancer Detection Fine‑Tune",
            description: "A fine‑tune of EfficientNet‑B1 to classify ultrasound breast tumors as malignant or benign."
        },
        {
            link: "https://huggingface.co/KedarPanchal/flan-t5-small-summary-finetune", 
            image: huggingfaceLogo, 
            title: "FLAN‑T5‑Small Summarization Fine‑Tune",
            description: "A LoRA fine‑tuned Flan‑T5‑Small model trained on research paper abstracts to generate summaries.",
        },
        {
            link: "https://github.com/KedarPanchal/GIMP-AI-Inpainting",
            image: gimpLogo,
            title: "GIMP AI Inpainting Plug‑In",
            description: "A local AI Inpainting plug‑in for GIMP 3.0 using Stable Diffusion XL to upgrade its image‑editing workflow.",
        },
        {
            link: "https://github.com/Sinistral-Synths/Whiplash",
            image: githubLogo,
            title: "Whiplash Harsh Noise Synthesizer",
            description: "A VST3 harsh noise synth featuring an ADSR envelope, pitch modulation, and five distortion effects.",
        },
        {
            link: "https://github.com/KedarPanchal/Portfolio-Website",
            image: nextLogo,
            title: "Kedar's Portfolio Site",
            description: "A Next.js and React portfolio website integrating an agentic, RAG-powered AI Assistant.",
        },
        {
            link: "https://github.com/KedarPanchal/LSPP",
            image: githubLogo,
            title: "lspp (ls++) CLI Tool",
            description: "An improved ls command with personalization features that lists files in a tree-style structure.",
        }
    ];
    return (
        <div className={styles.projectBlock}>
            {projectsArray.map((project) => {
                return <ProjectWidget href={project.link} imageSrc={project.image} widgetTitle={project.title} widgetDescription={project.description} key={project.title}/>
            })}
        </div>
    );
}
