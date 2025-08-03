"use client";

import Link from "next/link";
import styles from "./toolbar.module.css";
import { useRef, useEffect } from "react";
import { RefObject } from "react";

interface ToolbarProps {
    root: RefObject<HTMLDivElement|null>
}
export function Toolbar({root}: ToolbarProps) {
    type ToolbarKey = "about" | "chatbot" | "experience" | "projects" | "certifications";
    const toolbarRefs: Record<ToolbarKey, RefObject<HTMLAnchorElement|null>> = {
        about: useRef<HTMLAnchorElement>(null),
        chatbot: useRef<HTMLAnchorElement>(null),
        experience: useRef<HTMLAnchorElement>(null),
        projects: useRef<HTMLAnchorElement>(null),
        certifications: useRef<HTMLAnchorElement>(null),
    }

    useEffect(() => {
        const menuObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    toolbarRefs[entry.target.id as ToolbarKey].current!.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                    });
                    toolbarRefs[entry.target.id as ToolbarKey].current!.style.fontWeight = "normal";
                } else {
                    toolbarRefs[entry.target.id as ToolbarKey].current!.style.fontWeight = "lighter";
                }
            })
        }, {
            threshold: 0.95,
            root: root.current,
        });

        root.current!.querySelectorAll("section").forEach((section) => menuObserver.observe(section));
        return () => menuObserver.disconnect();
    });
    
    return (
        <nav className={styles.toolbar}>
            <span>
                <Link href="#about" ref={toolbarRefs["about"]} style={{ textDecoration: "none" }}>Kedar Panchal</Link>
            </span>
            <span>
                <Link href="#chatbot" ref={toolbarRefs["chatbot"]} style={{ textDecoration: "none" }}>AI Assistant</Link>
            </span>
            <span>
                <Link href="#experience" ref={toolbarRefs["experience"]} style={{ textDecoration: "none" }}>Experience</Link>
            </span>
            <span>
                <Link href="#projects" ref={toolbarRefs["projects"]} style={{ textDecoration: "none" }}>Projects</Link>
            </span>
            <span>
                <Link href="#certifications" ref={toolbarRefs["certifications"]} style={{ textDecoration: "none" }}>Certifications</Link>
            </span>
        </nav>  
    );
}
