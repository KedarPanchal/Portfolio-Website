import styles from "./aboutme.module.css";

import Image from "next/image";
import profileImage from "../../public/images/me.png";

export function AboutMeBlock() {
    return (
        <div>
            <Image src={profileImage} alt="A picture of Kedar Panchal" className={styles.profileImage}/>
        </div>
    )
}