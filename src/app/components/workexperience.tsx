"use client"

import styles from "./workexperience.module.css";

import { useState } from "react";
import Image from "next/image";
import arrowHead from "../../public/images/arrowhead.png";

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
                    {description.map((line, i) => {
                        return <li key={i}>{line}</li>
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
            description: [
                "Created Apps Script programs to automate issuance of late notices for real estate loan payments",
                "Explained and documented automation tools clearly to non-technical team members for them to utilize in their departments",
                "Managed mortgage software and spreadsheets for tracking and logging real-estate loan financials",
                "Automated tracking of property insurance premiums",
                "Communicated with borrowers regarding late payments",
            ],
        },
        {
            name: "Assistant Project Manager",
            workplace: "Recharge Realty LLC",
            date: {
                startMonth: "Jul",
                startYear: 2022,
                endYear: "Present",
            },
            description: [
                "Project-managed and performed real-estate renovation projects across Texas",
                "Renovated class B and C properties for lease or sale",
                "Carried out various installation, repair, maintenance, and make-ready tasks",
                "Met with tenants to identify necessary renovations and determine best course of action",
                "Coordinated with team-members to verify properties met move-out standards defined in lease agreement",
            ],
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
            description: [
                "Managed diverse team of 9 officers",
                "Drove recruitment programs to grow club membership to 400+ members",
                "Developed Java, Python, and JavaScript programs to automate member merit tracking & registration",
                "Directed IT team to maintain code",
                "Wrote detailed documentation and style guides to ensure code maintainability during and after my term's completion",
                "Coached members in developing professional writing, photo editing, financial projection, communication, and presentation skills",
            ]
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
            description: [
                "Tutored pre-K to high school-aged students in English and math",
                "Designed summer camp science activities for elementary-aged students",
                "Re-imaged older computers to use lightweight Linux distibutions for students to use for e-learning",
                "Trained fellow coworkers on installing necessary educational software on re-imaged computers",
                "Coordinated with fellow tutors to define personalized curriculum plans to maximize student success",
            ],
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
            description: [
                "Conducted research at the University of Texas at Austin RobIn Interactive Intelligence Lab",
                "Trained novel BaRiFlex robotic arm design using reinforcement machine learning techniques in performing grasping tasks",
                "Assembled and soldered 3-D printed robot apparatus used for collecting training data",
                "Programmed Bash scripts to automate recording sensor data as Robot Operating System Bags for storage and later use",
                "Developed Python scripts to translate ROS bags to AI-friendly HDF5 archives",
                "Designed Docker containers for cross-platform development using Linux-exclusive software",
            ],
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
            description: [
                "Tutored elementary to high school-aged Afghan and Ukrainian refugees in English and math",
                "Created lesson plans tailored to students' unique academic needs, language barriers, and cultural differences",
                "Corresponded with parents to create ever-evolving, continuous learning environment",
                "Held lessons and parent-teacher-student meetings using Zoom",
                "Coordinated with fellow tutors to adjust lesson plans for group tutoring sessions",
                "Re-imaged old computers with ChromeOS for students to use for online learning",
            ],
        },
        {
            name: "Founder",
            workplace: "Arbitrarium Games",
            date: {
                startMonth: "Aug",
                startYear: 2020,
                endMonth: "Dec",
                endYear: 2022,
            },
            description: [
                "Designed and sold tabletop board games using The Game Crafter's digital retail platform",
                "Used GIMP and Shotcut audiovisual editing tools to design game pieces and promotional material",
                "Adopted image-generating AI tools like Stable Diffusion early to create concept art",
                "Created an online following through Facebook and YouTube to market products and create informational content about the tabletop gaming industry",
            ],
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
                <Image src={arrowHead} alt="" className={styles.navButtonLeftArrow} />
            </button>
                {workExperienceArr[experienceIndex]}
            <button className={styles.navButton} onClick={incrementExperienceIndex}>
                <Image src={arrowHead} alt="" className={styles.navButtonRightArrow} />
            </button>
        </div>
    );
}