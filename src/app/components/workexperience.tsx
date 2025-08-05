"use client"

import styles from "./workexperience.module.css";

import { useState } from "react";

type Month = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
type JobDate = {
    startMonth: Month,
    startYear: number,
    endMonth?: Month,
    endYear: number | "Present",
}
interface WorkExperienceProps {
    jobName: string,
    workplaceName: string,
    date: JobDate,
    description: string[],
}
function WorkExperience({jobName, workplaceName, date, description}: WorkExperienceProps) {
    return (
        <div className={styles.workExperience}>
            <div className={styles.jobTitle}>
                <h1 className={styles.jobTitleText}><span style={{ fontWeight: "normal" }}>{jobName}</span> - <em>{workplaceName}</em></h1>
            </div>
            <div className={styles.jobDescription}>
                <p className={styles.jobDate}>{date.startMonth} {date.startYear} - {date.endMonth ?? ""} {date.endYear}</p>
                <ul className={styles.jobDescriptionText}>
                    {description.map((line) => {
                        return <li>{line}</li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export function WorkExperienceBlock() {
    const [experienceIndex, setExperienceIndex] = useState(0);

    type Job = {
        name: string,
        workplace: string,
        date: JobDate,
        description: string[],
    }
    const jobs: Job[] = [
        {
            name: "Automation Developer",
            workplace: "MathNMore LLC",
            date: {
                startMonth: "Jul",
                startYear: 2022,
                endYear: "Present",
            },
            description: []
        },
        {
            name: "Assistant Project Manager",
            workplace: "Recharge Realty LLC",
            date: {
                startMonth: "Jul",
                startYear: 2022,
                endYear: "Present",
            },
            description: []
        },
        {
            name: "Vice President of Operations",
            workplace: "McNeil DECA",
            date: {
                startMonth: "Apr",
                startYear: 2024,
                endMonth: "May",
                endYear: 2025,
            },
            description: []
        },
        {
            name: "Academic Tutor",
            workplace: "Eye Level Learning",
            date: {
                startMonth: "Jun",
                startYear: 2024,
                endMonth: "Dec",
                endYear: 2024,
            },
            description: []
        },
        {
            name: "Summer Robotics Research Intern",
            workplace: "The University of Texas at Austin RobIn Lab",
            date: {
                startMonth: "Jun",
                startYear: 2024,
                endMonth: "Jul",
                endYear: 2024,
            },
            description: []
        },
        {
            name: "Academic Tutor",
            workplace: "Global Impact Initiative",
            date: {
                startMonth: "Jun",
                startYear: 2023,
                endMonth: "Aug",
                endYear: 2023
            },
            description: []
        },
        {
            name: "Founder",
            workplace: "Arbitrarium Games",
            date: {
                startMonth: "Aug",
                startYear: 2020,
                endMonth: "Aug",
                endYear: 2021,
            },
            description: []
        }
    ];

    const workExperienceArr = jobs.map((job, i) => {
        return <WorkExperience 
            jobName={job.name} 
            workplaceName={job.workplace} 
            date={job.date} 
            description={job.description} 
            key={i} 
        />
    });

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
            <button className={styles.navButton} onClick={decrementExperienceIndex}>
                <p>{"<"}</p>
            </button>
                {workExperienceArr[experienceIndex]}
            <button className={styles.navButton} onClick={incrementExperienceIndex}>
                <p>{">"}</p>
            </button>
        </div>
    );
}