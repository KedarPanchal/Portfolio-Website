"use client";

import Link from "next/link";
import styles from "./toolbar.module.css";

export function Toolbar() {
    return (
        <nav className={styles.toolbar}>
            <h1><Link href="#about" style={{ textDecoration: "none" }}>Kedar Panchal</Link></h1>
            <h2><Link href="#chatbot" style={{ textDecoration: "none" }}>AI Assistant</Link></h2>
            <h2><Link href="/" style={{ textDecoration: "none" }}>Experience</Link></h2>
            <h2><Link href="/" style={{ textDecoration: "none" }}>Projects</Link></h2>
            <h2><Link href="/" style={{ textDecoration: "none" }}>Certifications</Link></h2>
        </nav>
    );
}