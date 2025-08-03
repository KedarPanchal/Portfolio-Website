import styles from "./projectwidget.module.css";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface ProjectWidgetProps {
    href: string,
    imageSrc: StaticImageData,
    altText?: string,
    widgetTitle: string,
    widgetDescription: string,
}
export function ProjectWidget({href, imageSrc, altText="", widgetTitle, widgetDescription}: ProjectWidgetProps) {
    return (
        <Link href={href} target="_blank" className={styles.widgetBlock}>
            <div className={styles.widgetTop}>
                <Image src={imageSrc} alt={altText} className={styles.widgetImage}/>
                <h1 className={styles.widgetTitle}>{widgetTitle}</h1>
            </div>
            <div className={styles.widgetBottom}>
                <p className={styles.widgetDescription}>{widgetDescription}</p>
            </div>
        </Link>
    );
}