"use client";

import Link from "next/link";
import styles from "./toolbar.module.css";
import { useRef, useEffect, JSX } from "react";
import { RefObject } from "react";

type IntersectionFunction = (target: HTMLElement) => void;
export type NavigationKey = "about" | "chatbot" | "experience" | "projects" | "certifications";
type NavigationContent = {
    name?: string,
    element?: JSX.Element,
    ref: RefObject<HTMLElement | null>,
}
export type NavigationRefs = Record<NavigationKey, NavigationContent>;
export function scrollObserver(root: HTMLElement | null, navigationRefs: NavigationRefs, intersectionFunction: IntersectionFunction, nonintersectionFunction: IntersectionFunction) {
    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const scrollTarget = navigationRefs[entry.target.id.replace("toolbar_", "") as NavigationKey].ref.current!;
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
        about: {
            name: "Kedar Panchal",
            ref: useRef<HTMLElement>(null),
        },
        chatbot: {
            name: "AI Assistant",
            ref: useRef<HTMLElement>(null),
        },
        experience: {
            name: "Experience",
            ref: useRef<HTMLElement>(null),
        },
        projects: {
            name: "Projects",
            ref: useRef<HTMLElement>(null),
        },
        certifications: {
            name: "Certifications",
            ref: useRef<HTMLElement>(null),
        },
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
    }, []);

    return (
        <nav className={styles.toolbar} ref={ref}>
            {Object.keys(toolbarRefs).map((id) => {
                return (
                    <span id={`toolbar_${id}`} ref={toolbarRefs[id as NavigationKey].ref} key={id}>
                        <Link href={`#${id}`} style={{ textDecoration: "none", textTransform: "capitalize" }}>{toolbarRefs[id as NavigationKey].name}</Link>
                    </span>
                );
            })}
        </nav>  
    );
}
