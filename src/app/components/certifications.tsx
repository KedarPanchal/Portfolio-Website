import styles from "./certifications.module.css";

import Image, { StaticImageData } from "next/image";

import { CSSProperties } from "react";

import microsoftLogo from "../../public/images/logos/microsoftlogo.png";
import deepLearningAILogo from "../../public/images/logos/deeplearningailogo.png";
import javaLogo from "../../public/images/logos/javalogo.png";
import pythonLogo from "../../public/images/logos/pythonlogo.png";
import linkedinLogo from "../../public/images/logos/linkedinlogo.png";

interface CertificationWidgetProps {
    imageSrc: StaticImageData,
    altText?: string,
    certificationName: string,
    style?: CSSProperties,
}
function CertificationWidget({imageSrc, altText="", certificationName, style}: CertificationWidgetProps) {
    return (
        <div className={styles.certificationWidget} style={style}>
            <Image src={imageSrc} alt={altText} className={styles.certificationWidgetImage} />
            <p className={styles.certificationWidgetName}>{certificationName}</p>
        </div>
    )
}

export function CertificationsBlock() {
    type Certification = {
        image: StaticImageData,
        altText?: string,
        name: string,
    }
    const certifications: Certification[] = [
        {
            image: microsoftLogo,
            name: "Microsoft AI & ML Engineering",
        },
        {
            image: deepLearningAILogo,
            name: "Machine Learning Specialization",
        }, 
        {
            image: javaLogo,
            name: "Certiport IT Specialist: Java",
        },
        {
            image: pythonLogo,
            name: "PCEP Entry-Level Programmer",
        },
        {
            image: microsoftLogo,
            name: "Microsoft Office Specialist: Excel Associate",
        },
        {
            image: microsoftLogo,
            name: "Microsoft Office Specialist: PowerPoint Associate",
        },
        {
            image: microsoftLogo,
            name: "Microsoft Office Specialist: Word Associate",
        },
        {
            image: linkedinLogo,
            name: "Deep Learning with Python: Sequence Models and Transformers",
        },
    ];
    
    return (
        <div className={styles.certificationsBlock}>
            {certifications.map((certification, i, arr) => {
                    return <CertificationWidget imageSrc={certification.image} altText={certification.altText ?? ""} certificationName={certification.name} key={certification.name}/>
            })}
        </div>
    );
}