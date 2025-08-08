import styles from "./certifications.module.css";

import Image, { StaticImageData } from "next/image";

import microsoftLogo from "../../public/images/logos/microsoftlogo.png";
import deepLearningAILogo from "../../public/images/logos/deeplearningailogo.png";
import javaLogo from "../../public/images/logos/javalogo.png";
import pythonLogo from "../../public/images/logos/pythonlogo.png";
import { CSSProperties } from "react";

interface CertificationWidgetProps {
    imageSrc: StaticImageData,
    altText?: string,
    certificationName: string,
    style?: CSSProperties,
}
function CertificationWidget({imageSrc, altText="", certificationName, style}: CertificationWidgetProps) {
    return (
        <div className={styles.certificationWidget} style={style}>
            <Image src={imageSrc} alt={altText} className={styles.certificationImage} />
            <p className={styles.certificationName}>{certificationName}</p>
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
    ];
    return (
        <div className={styles.certificationsBlock}>
            {certifications.map((certification, i, arr) => {
                if (i < arr.length - 1) {
                    return <CertificationWidget imageSrc={certification.image} altText={certification.altText ?? ""} certificationName={certification.name} key={i}/>
                } else if (arr.length % 3 == 1) {
                    return (
                        <div className={styles.finalCertificationWidget} key={i}>
                            <CertificationWidget imageSrc={certification.image} altText={certification.altText ?? ""} certificationName={certification.name} />
                        </div>
                    );
                }
            })}
        </div>
    );
}