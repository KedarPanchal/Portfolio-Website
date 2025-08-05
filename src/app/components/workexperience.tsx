"use client"

import styles from "./workexperience.module.css";

import { useState } from "react";

interface WorkExperienceProps {
    jobName: string,
    workplaceName: string,
}
function WorkExperience({jobName, workplaceName}: WorkExperienceProps) {
    return (
        <div className={styles.workExperience}>
            <div className={styles.jobTitle}>
                <h1 className={styles.jobTitleText}><span style={{ fontWeight: "normal" }}>{jobName}</span> - <em>{workplaceName}</em></h1>
            </div>
            <div className={styles.jobDescription}>
                <p className={styles.jobDescriptionText}></p>
            </div>
        </div>
    );
}

export function WorkExperienceBlock() {
    const [experienceIndex, setExperienceIndex] = useState(0);
    const workExperienceArr = [
        (<WorkExperience jobName="Automation Developer" workplaceName="MathNMore LLC" />),
        (<WorkExperience jobName="Assistant Project Manager" workplaceName="Recharge Realty LLC" />),
        (<WorkExperience jobName="Vice President of Operations" workplaceName="McNeil DECA" />),
        (<WorkExperience jobName="Academic Tutor" workplaceName="Eye Level Learning" />),
        (<WorkExperience jobName="Summer Robotics Research Intern" workplaceName="The University of Texas at Austin RobIn Lab" />),
        (<WorkExperience jobName="Acadmic Tutor" workplaceName="Global Impact Initiative" />),
        (<WorkExperience jobName="Founder" workplaceName="Arbitrarium Games" />),
    ];

    const incrementExperienceIndex = () => {
        if (experienceIndex < workExperienceArr.length - 1) {
            setExperienceIndex(experienceIndex + 1);
        } else {
            setExperienceIndex(0);
        }
    }

    const decrementExperienceIndex = () => {
        if (experienceIndex > 0) {
            setExperienceIndex(experienceIndex - 1);
        } else {
            setExperienceIndex(workExperienceArr.length - 1);
        }
    }

    return (
        <div className={styles.workExperienceBlock}>
            <button className={styles.navButton} onClick={incrementExperienceIndex}>
                <p>{"<"}</p>
            </button>
                {workExperienceArr[experienceIndex]}
            <button className={styles.navButton} onClick={decrementExperienceIndex}>
                <p>{">"}</p>
            </button>
        </div>
    );
}