import { DependencyList, RefObject } from "react";
import { useEffect } from "react";

export type NavigationKey = "about" | "chatbot" | "experience" | "projects" | "certifications";
export type NavigationRefs = Record<NavigationKey, RefObject<HTMLElement|null>>;
type IntersectionFunctions = {
    intersect: (target: HTMLElement) => void,
    nonintersect?: (target: HTMLElement) => void,
}
export default function useScrollObserver(scrollTargetTag: string, root: RefObject<HTMLElement | null>, navigationRefs: NavigationRefs, intersectionFunctions: IntersectionFunctions, deps?: DependencyList) {
    useEffect(() => {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const scrollTarget = navigationRefs[entry.target.id.replace("toolbar_", "") as NavigationKey].current!;
                if (entry.isIntersecting) {
                    intersectionFunctions.intersect(scrollTarget);
                } else if (intersectionFunctions.nonintersect) {
                    intersectionFunctions.nonintersect(scrollTarget);
                }
            });
        }, {
            threshold: 0.95,
            root: root.current!,
        });

        root.current!.querySelectorAll(scrollTargetTag).forEach((element) => scrollObserver.observe(element));
        return () => scrollObserver.disconnect();
    }, deps);
}