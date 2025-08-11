"use client";

import styles from "./toolbar.module.css";

import { useRef } from "react";
import { RefObject } from "react";

import Link from "next/link";

import { useScrollObserver } from "../hooks/scrollobserver";
import { NavigationRefs, NavigationKey } from "../hooks/scrollobserver";

interface ToolbarProps {
    root: RefObject<HTMLDivElement | null>,
    ref: RefObject<HTMLElement | null>,
}
export function Toolbar({root, ref}: ToolbarProps) {
    const toolbarRefs: NavigationRefs = {
        about: useRef<HTMLElement>(null),
        chatbot: useRef<HTMLElement>(null),
        experience: useRef<HTMLElement>(null),
        projects: useRef<HTMLElement>(null),
        certifications: useRef<HTMLElement>(null),
    }

    const toolbarNames: Record<NavigationKey, string> = {
        about: "Kedar Panchal",
        chatbot: "AI Assistant",
        experience: "Experience",
        projects: "Projects",
        certifications: "Certifications",
    }
    console.log(root);
    useScrollObserver(
        "section",
        root, 
        toolbarRefs,
        {
            intersect: (target: HTMLElement) => {
                target.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                });
                target.style.fontWeight = "normal";
            },
            nonintersect: (target: HTMLElement) => target.style.fontWeight = "lighter"
        }, 
        [],
    );

    return (
        <nav className={styles.toolbar} ref={ref}>
            {Object.keys(toolbarRefs).map((id) => {
                return (
                    <span id={`toolbar_${id}`} ref={toolbarRefs[id as NavigationKey]} key={id}>
                        <Link href={`#${id}`} style={{ textDecoration: "none", textTransform: "capitalize" }}>{toolbarNames[id as NavigationKey]}</Link>
                    </span>
                );
            })}
        </nav>  
    );
}
