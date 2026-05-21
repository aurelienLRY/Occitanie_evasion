"use client";

import Link from "next/link";
import CustomSection from "@/components/layout/Section";
import RotatingText from "@/components/ui/rotating-text";
import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";

 const BookingSection = ( { className }: { className?: string } ) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Variantes d'animation pour les éléments
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: easeOut,
            }
        }
    };

    const rotatingTextVariants = {
        hidden: { opacity: 0, y: 30, rotateX: -15 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 1,
                ease: easeOut,
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeOut,
                delay: 0.5
            }
        }
    };

    const emojiVariants = {
        hidden: { opacity: 0, scale: 0, rotate: -180 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: easeOut,
                delay: 0.4
            }
        }
    };

    return (
        <div ref={ref}>
            <CustomSection 
                className={`flex flex-col gap-6 w-full min-h-[600px] bg-secondary justify-center items-center text-white ${className}`}
                TopMarker={true} 
                BottomMarker={true} 
                Markercolor="secondary"
            >
            <motion.div 
                className="flex flex-col items-center justify-center"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div variants={rotatingTextVariants}>
                    <RotatingText
                        mainClassName="text-6xl lg:text-8xl text-center font-title"
                        texts={["Canyoning", "Escalade", "Spéléologie", "Via corda"]} 
                    />
                </motion.div>
                
                <motion.h2 
                    variants={itemVariants}
                    className="text-4xl lg:text-6xl text-center"
                >
                    Tu sais déjà ce que tu veux ? <br /> Réserve ta sortie en quelques clics !
                </motion.h2>
            </motion.div>

            <motion.div 
                className="flex flex-col items-center justify-center gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.span 
                    variants={emojiVariants}
                    className="text-2xl lg:text-4xl mt-4"
                >
                    👇
                </motion.span>
                
                <motion.div variants={buttonVariants}>
                    <Link 
                        href="/reservation" 
                        className="bg-white text-black text-xl px-4 py-2 rounded-lg hover:scale-105 hover:bg-white/80 transition-all duration-300"
                    >
                        Go pour l&apos;aventure !
                    </Link>
                </motion.div>
            </motion.div>
            </CustomSection>
        </div>
    )
 }

 export default BookingSection;
 BookingSection.displayName = "BookingSection";