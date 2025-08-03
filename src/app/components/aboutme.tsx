import styles from "./aboutme.module.css";

import Image from "next/image";
import profileImage from "../../public/images/me.png";

export function AboutMeBlock() {
    return (
        <div className={styles.chatbotBlock}>
            <Image src={profileImage} alt="A picture of Kedar Panchal" className={styles.profileImage}/>
            <p className={styles.aboutMeText}>
                Hi, I&#39;m <span className={styles.name}>Kedar Panchal</span>, a Computer Science and Engineering Honors student at Texas A&M with a passion for artificial intelligence and its potential to create innovative solutions.
                Feel free to scroll down to interact with an <b>AI assistant</b> to learn about my projects, skills, work experience, and more, or explore my website further to view this information in-depth.
            </p>
        </div>
    )
}