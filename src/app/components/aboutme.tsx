import styles from "./aboutme.module.css";

import Image, { StaticImageData } from "next/image";

import profileImage from "../../public/images/me.png";
import pythonLogo from "../../public/images/logos/pythonlogo.png";
import javaLogo from "../../public/images/logos/javalogo.png";
import pytorchLogo from "../../public/images/logos/pytorchlogo.png";
import githubLogo from "../../public/images/logos/githublogo.png";
import huggingfaceLogo from "../../public/images/logos/huggingfacelogo.png";
import tsLogo from "../../public/images/logos/tslogo.png";
import nextLogo from "../../public/images/logos/nextlogo.png";
import sklearnLogo from "../../public/images/logos/sklearnlogo.png";
import kerasLogo from "../../public/images/logos/keraslogo.png";
import dockerLogo from "../../public/images/logos/dockerlogo.png";
import { CSSProperties } from "react";

interface SkillWidgetProps {
    imageSrc: StaticImageData,
    altText?: string,
    skillName: string,
    style?: CSSProperties
}
function SkillWidget({imageSrc, altText="", skillName, style}: SkillWidgetProps) {
    return (
        <div className={styles.skillWidget} style={style}>
            <Image src={imageSrc} alt={altText} className={styles.skillImage}/>
            <p className={styles.skillName}>{skillName}</p>
        </div>
    );
}

export function AboutMeBlock() {
    return (
        <div className={styles.chatbotBlock}>
            <Image src={profileImage} alt="A picture of Kedar Panchal" className={styles.profileImage}/>
            <p className={styles.aboutMeText}>
                Hi, I&#39;m <span className={styles.name}>Kedar Panchal</span>, a Computer Science and Engineering Honors student at Texas A&M with a passion for artificial intelligence and its potential to create innovative solutions.
                Feel free to scroll down to interact with an <b>AI assistant</b> to learn about my projects, skills, work experience, and more, or <b>explore my website further</b> to view this information in-depth.
            </p>
            <div className={styles.skillsBlock}>
                <SkillWidget imageSrc={pythonLogo} skillName="Python"/>
                <SkillWidget imageSrc={javaLogo} skillName="Java" />
                <SkillWidget imageSrc={pytorchLogo} skillName="PyTorch" />
                <SkillWidget imageSrc={githubLogo} skillName="Git & GitHub" />
                <SkillWidget imageSrc={huggingfaceLogo} skillName="Huggingface" />
                <SkillWidget imageSrc={tsLogo} skillName="TypeScript" />
                <SkillWidget imageSrc={nextLogo} skillName="Next.js" />
                <SkillWidget imageSrc={sklearnLogo} skillName="scikit-learn" />
                <SkillWidget imageSrc={kerasLogo} skillName="Keras" />
                <SkillWidget imageSrc={dockerLogo} skillName="Docker" style={{ gridColumnStart: 2 }}/>
            </div>
        </div>
    )
}