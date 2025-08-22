"use client";

import styles from "./toolbar.module.css";

import { useRef } from "react";
import { RefObject } from "react";

import Link from "next/link";

import { useScrollObserver } from "../hooks/scrollobserver";
import { NavigationRefs, NavigationKey } from "../hooks/scrollobserver";
import Scrollbar from "react-scrollbars-custom";

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
                <Scrollbar
                    trackXProps={{
                        style: {
                            background: "transparent",
                            height: "0.4vmax",
                        }
                    }}
                    thumbXProps={{
                        style: {
                            background: "#EDEDED",
                        },
                    }}
                    contentProps={{
                        className: styles.scrollbar
                    }}
                    scrollerProps={{
                        className: styles.scroller
                    }}
                >
                {Object.keys(toolbarRefs).map((id) => {
                    return (
                        <span className={styles.toolbarElement} id={`toolbar_${id}`} ref={toolbarRefs[id as NavigationKey]} key={id}>
                            <Link href={`#${id}`} style={{ textDecoration: "none", textTransform: "capitalize" }}>{toolbarNames[id as NavigationKey]}</Link>
                        </span>
                    );
                })}
                </Scrollbar>
            </nav>  
    );
}
