"use client"

import styles from "./workexperience.module.css";

import { CSSProperties, useRef, useState } from "react";

interface WorkExperienceWidgetProps {
    jobTitle: string,
    companyName: string,
    selected?: boolean,
    style?: CSSProperties
}
function WorkExperienceWidget({jobTitle, companyName, selected=false, style}: WorkExperienceWidgetProps) {
    const colorScheme = selected ? styles.workExperienceWidgetSelected : styles.workExperienceWidgetUnselected;
    return (
        <button className={`${styles.workExperienceWidget} ${colorScheme}`} style={style} onClick={() => console.log("Hello world!")}>
            <h1 className={styles.jobTitle}>{jobTitle}</h1>
            <p className={styles.companyName}>{companyName}</p>
        </button>
    );
}

function WorkExperienceDescription() {
    return (
        <div className={styles.WorkExperienceDescription}>

        </div>
    );
}

export function WorkExperienceBlock() {
    type WorkExperience = {
        title: string;
        company: string;
    }

    const workExperiences: WorkExperience[] = [
        {title: "Automation Developer", company: "MathNMore LLC"},
        {title: "Assistant Project Manager", company: "Recharge Realty LLC"},
        {title: "Vice President of Operations", company: "DECA Inc."},
        {title: "Summer Robotics Research Intern", company: "The University of Texas at Austin RobIn Lab"},
        {title: "Academic Tutor", company: "Eye Level Learning"},
        {title: "Academic Tutor", company: "Global Impact Initiative"},
        {title: "Founder", company: "Arbitrarium Games"},
    ];
    return (
        <div className={styles.workExperienceBlock}>
            {workExperiences.map((experience, i, workExperiences) => {
                const style = {
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                }
                if (i == 0) {
                    style.borderTopLeftRadius = "10px";
                }
                if (i == workExperiences.length - 1) {
                    style.borderTopRightRadius = "10px";
                }

                return <WorkExperienceWidget jobTitle={experience.title} companyName={experience.company} style={style} key={i}/>
            })}
        </div>
    );
}