
import dynamic from "next/dynamic";
import {useSpots} from "@/hooks/useQuery"
import { ISpot } from "@/types";
import MapSkeleton from "@/components/ui/mapCustomer/mapSkeleton";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WhereSection( { className }: { className?: string } ) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const MapCustomer = dynamic(() => import("@/components/ui/mapCustomer"), {
        ssr: false,
        loading: () => <MapSkeleton />,
    });

    const { data: spots } = useSpots();

    // Variantes d'animation pour les éléments
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -50, y: 20 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    const mapVariants = {
        hidden: { opacity: 0, scale: 0.9, x: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.3
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 30, rotateX: -10 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section ref={ref} className={` max-w-7xl mx-auto min-h-[800px] flex justify-center items-center   ${className}`}>
            <motion.div 
                className="flex flex-col lg:flex-row items-center justify-center gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div 
                    className="flex flex-col gap-4 lg:flex-1/3"
                    variants={containerVariants}
                >
                    <motion.h2 
                        variants={titleVariants}
                        className=" lg:!text-6xl text-center lg:text-start"
                    >
                        Où me trouver <span className="text-secondary">?</span>
                    </motion.h2>
                    
                    <motion.h3 
                        variants={textVariants}
                        className="text-2xl lg:text-4xl text-center lg:text-start"
                    >
                        Aude , Tarn , Hérault, Pyrénées-Orientales
                    </motion.h3>
                    
                    <motion.p 
                        variants={textVariants}
                        className="mt-2 text-lg opacity-80 text-center lg:text-start"
                    >
                        Sélectionne ton terrain de jeu et <strong>laisse-toi guider pour réserver ta sortie !</strong>
                    </motion.p>
                </motion.div>
                
                <motion.div 
                    className="flex  lg:flex-1/2 relative w-full"
                    variants={mapVariants}
                >
                    {spots && <MapCustomer spots={spots as ISpot[]} />}
                </motion.div>
            </motion.div>
        </section>
    )
}

WhereSection.displayName = "WhereSection";