"use client";

import styles from "./particles.module.css";

import { useCallback } from "react";

import { Particles } from "react-tsparticles";
import { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";


export function ParticleBG() {
    const initParticles = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const loadedParticles = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);

    return (
        <div className={styles.particleBackground}>
        <Particles
            id="tsparticles"
            init={initParticles}
            loaded={loadedParticles}
            options={{
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "repulse"
                        },
                        resize: true,
                    },
                    modes: {
                        repulse: {
                            distance: 200,
                            duration: 1,
                        },
                    }
                },
                particles: {
                    color: {
                        value: "#04d9ff",
                    },
                    links: {
                        color: "#04d9ff",
                        distance: 150,
                        enable: true,
                        opacity: 0.25,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                        mode: "bounce",
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { 
                            min: 1, 
                            max: 5, 
                        },
                    }
                },
                detectRetina: true,
            }}
        />
        </div>
    );
}
