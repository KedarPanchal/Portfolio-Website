import { useEffect } from "react";
import { DependencyList, RefObject } from "react";

export type NavigationKey = "about" | "chatbot" | "experience" | "projects" | "certifications";
export type NavigationRefs = Record<NavigationKey, RefObject<HTMLElement | null>>;
type IntersectionFunctions = {
    intersect: (target: HTMLElement) => void,
    nonintersect?: (target: HTMLElement) => void,
}
/*
 * scrollTargetTag: The tag of the elements the IntersectionObserver will check is occupying the screen
 * root: The parent element of the elements the IntersectionObserver will check is occupying the screen
 * navigationRefs: A map of the different section IDs on their website to the ref of the HTML element that will be scrolled towards
 * intersectionFunctions: The functions to be called if the IntersectionObserver notices an element is occupying the screen or not
 * deps: The optional dependency list for the useEffect hook that initializes the scrollObserver
*/
export function useScrollObserver(scrollTargetTag: string, root: RefObject<HTMLElement | null>, navigationRefs: NavigationRefs, intersectionFunctions: IntersectionFunctions, deps?: DependencyList) {
    useEffect(() => {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // Set the target (HTMLElement) to scroll towards to be the navigationRef with the corresponding ID
                const scrollTarget = navigationRefs[entry.target.id.replace("toolbar_", "") as NavigationKey].current!;
                if (entry.isIntersecting) {
                    intersectionFunctions.intersect(scrollTarget);
                } else if (intersectionFunctions.nonintersect) {
                    intersectionFunctions.nonintersect(scrollTarget);
                }
            });
        }, {
            threshold: 0.95, // If the element intersects by 95%, then consider it intersected
            root: root.current!,
        });
        
        root.current!.querySelectorAll(scrollTargetTag).forEach((element) => scrollObserver.observe(element));
        return () => scrollObserver.disconnect();
    }, deps);
}