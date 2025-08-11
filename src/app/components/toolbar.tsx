"use client";

import Link from "next/link";
import styles from "./toolbar.module.css";
import { useRef, useEffect } from "react";
import { RefObject } from "react";

type IntersectionFunction = (target: HTMLElement) => void;
type NavigationKey = "about" | "chatbot" | "experience" | "projects" | "certifications";
export type NavigationRefs = Record<NavigationKey, RefObject<HTMLElement | null>>;
export function scrollObserver(root: HTMLElement | null, navigationRefs: NavigationRefs, intersectionFunction: IntersectionFunction, nonintersectionFunction: IntersectionFunction) {
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
    root: RefObject<HTMLDivElement|null>,
    ref: RefObject<HTMLElement|null>,
}
export function Toolbar({root, ref}: ToolbarProps) {
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
        <nav className={styles.toolbar} ref={ref}>
            <span ref={toolbarRefs["about"]}>
                <Link href="#about" style={{ textDecoration: "none" }}>Kedar Panchal</Link>
            </span>
            <span ref={toolbarRefs["chatbot"]}>
                <Link href="#chatbot" style={{ textDecoration: "none" }}>AI Assistant</Link>
            </span>
            <span ref={toolbarRefs["experience"]}>
                <Link href="#experience" style={{ textDecoration: "none" }}>Experience</Link>
            </span>
            <span ref={toolbarRefs["projects"]}>
                <Link href="#projects" style={{ textDecoration: "none" }}>Projects</Link>
            </span>
            <span ref={toolbarRefs["certifications"]}>
                <Link href="#certifications" style={{ textDecoration: "none" }}>Certifications</Link>
            </span>
        </nav>  
    );
}
