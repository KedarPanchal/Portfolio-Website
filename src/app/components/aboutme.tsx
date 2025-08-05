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
    type Skill = {
        image: StaticImageData;
        name: string;
    }
    
    const skillsArray: Skill[] = [
        {image: pythonLogo, name: "Python"}, 
        {image: javaLogo, name: "Java"}, 
        {image: pytorchLogo, name: "PyTorch"}, 
        {image: githubLogo, name: "Git & GitHub"}, 
        {image: huggingfaceLogo, name: "Huggingface"},
        {image: tsLogo, name: "TypeScript"},
        {image: nextLogo, name: "Next.js"},
        {image: sklearnLogo, name: "scikit-learn"},
        {image: kerasLogo, name: "Keras"},
        {image: dockerLogo, name: "Docker"},
    ];
    return (
        <div className={styles.aboutMeBlock}>
            <Image src={profileImage} alt="A picture of Kedar Panchal" className={styles.profileImage}/>
            <p className={styles.aboutMeText}>
                Hi, I&#39;m <span className={styles.name}>Kedar Panchal</span>, a Computer Science and Engineering Honors student at Texas A&M with a passion for artificial intelligence and its potential to create innovative solutions.
                Feel free to scroll down to interact with an <b>AI assistant</b> to learn about my projects, skills, work experience, and more, or <b>explore my website further</b> to view this information in-depth.
            </p>
            <div className={styles.skillsBlock}>
                {skillsArray.map((skill, i, arr) => {
                    if (i < arr.length - 1) {
                        return <SkillWidget imageSrc={skill.image} skillName={skill.name} key={i}/>  
                    } else if (arr.length % 3 == 1) {
                        return <SkillWidget imageSrc={skill.image} skillName={skill.name} style={{ gridColumnStart: 2 }} key={i}/>
                    }
                })}
            </div>
        </div>
    )
}
