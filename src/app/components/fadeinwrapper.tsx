"use client"

import styles from "./fadeinwrapper.module.css";

import { useState, useRef, useEffect } from "react";
import { RefObject, ReactNode } from "react";

interface FadeInWrapperProps {
    root: RefObject<HTMLDivElement | null>,
    children: ReactNode,
}
export function FadeInWrapper({root, children}: FadeInWrapperProps) {
    const [isVisible, setVisibility] = useState(false);
    const fadeInWrapperRef = useRef(null);

    useEffect(() => {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setVisibility(entry.isIntersecting));
        }, {
            root: root.current,
            threshold: 0.1,
        });

        fadeInObserver.observe(fadeInWrapperRef.current!);
        return () => fadeInObserver.disconnect();
    }, []);

    return (
        <div className={`${styles.fadeInBlock} ${isVisible ? styles.isVisible : ""}`} ref={fadeInWrapperRef}>
            {children}
        </div>
    );
}