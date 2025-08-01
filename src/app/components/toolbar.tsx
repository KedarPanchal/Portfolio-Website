"use client";

import Link from "next/link";
import styles from "./toolbar.module.css";
import { useRef, useEffect } from "react";
import { RefObject } from "react";

interface ToolbarProps {
    root: RefObject<HTMLDivElement|null>
}
export function Toolbar({root}: ToolbarProps) {
    type ToolbarKey = "about" | "chatbot";
    const toolbarRefs: Record<ToolbarKey, RefObject<HTMLAnchorElement|null>> = {
        about: useRef<HTMLAnchorElement>(null),
        chatbot: useRef<HTMLAnchorElement>(null),
    }

    useEffect(() => {
        const menuObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    toolbarRefs[entry.target.id as ToolbarKey].current!.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                    });
                }
            })
        }, {
            threshold: 0.95,
            root: root.current,
        });

        root.current!.querySelectorAll("section").forEach((section) => menuObserver.observe(section));
        return () => menuObserver.disconnect();
    }, []);
    
    return (
        <nav className={styles.toolbar}>
            <h1><Link href="#about" ref={toolbarRefs["about"]} style={{ textDecoration: "none" }}>Kedar Panchal</Link></h1>
            <h2><Link href="#chatbot" ref={toolbarRefs["chatbot"]} style={{ textDecoration: "none" }}>AI Assistant</Link></h2>
            <h2><Link href="/" style={{ textDecoration: "none" }}>Experience</Link></h2>
            <h2><Link href="/" style={{ textDecoration: "none" }}>Projects</Link></h2>
            <h2><Link href="/" style={{ textDecoration: "none" }}>Certifications</Link></h2>
        </nav>
    );
}
