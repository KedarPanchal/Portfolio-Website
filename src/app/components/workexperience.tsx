"use client"

import styles from "./workexperience.module.css";

import { CSSProperties, useRef, useState } from "react";

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
    return (
        <div className={styles.workExperienceBlock}>
            <button className={styles.navButton}>
                <p>{"<"}</p>
            </button>
                <WorkExperience jobName="Automation Developer" workplaceName="MathNMore LLC"/>
            <button className={styles.navButton}>
                <p>{">"}</p>
            </button>
        </div>
    );
}