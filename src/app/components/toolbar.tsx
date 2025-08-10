"use client";

import Link from "next/link";
import styles from "./toolbar.module.css";
import { useRef, useEffect } from "react";
import { RefObject } from "react";

type IntersectionFunction = (target: HTMLAnchorElement) => void;
type NavigationKey = "about" | "chatbot" | "experience" | "projects" | "certifications";
type NavigationRefs = Record<NavigationKey, RefObject<HTMLAnchorElement | null>>;
export function scrollObserver(root: HTMLDivElement | null, navigationRefs: NavigationRefs, intersectionFunction: IntersectionFunction, nonintersectionFunction: IntersectionFunction) {
    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const scrollTarget = navigationRefs[entry.target.id as NavigationKey].current!;
            if (entry.isIntersecting) {
                intersectionFunction(scrollTarget);
            } else {
                nonintersectionFunction(scrollTarget);
            }
        });
    }, {
        threshold: 0.95,
        root: root,
    });
}

interface ToolbarProps {
    root: RefObject<HTMLDivElement|null>
}
export function Toolbar({root}: ToolbarProps) {
    const toolbarRefs: NavigationRefs = {
        about: useRef<HTMLAnchorElement>(null),
        chatbot: useRef<HTMLAnchorElement>(null),
        experience: useRef<HTMLAnchorElement>(null),
        projects: useRef<HTMLAnchorElement>(null),
        certifications: useRef<HTMLAnchorElement>(null),
    }

    useEffect(() => {
        const menuObserver = scrollObserver(root.current, toolbarRefs, (target) => {
            target.scrollIntoView({
                behavior: "smooth",
                inline: "center",
            });
            target.style.fontWeight = "normal";
        }, (target) => {
            target.style.fontWeight = "lighter";
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
