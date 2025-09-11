"use client"
import PictureCard  from "@/components/ui/card/picture.Card";
import { useIsMobile } from "@/hooks";
import { cn } from "@/lib/utils";
import { memo, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface IGalleryInsta {
    url: string;
    alt: string;
}

export type GalleryInstaArray = IGalleryInsta[];

const GalleryInsta = ({gallery, className, backgroundColor = 'white'}: {gallery: GalleryInstaArray, className?: string, backgroundColor?: string}) => {
    const isMobile = useIsMobile();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const memoizedGallery = useMemo(() => {
        if(isMobile) {
            return gallery.slice(0, 3);
        }
        return gallery;
    }, [isMobile, gallery]);

    // Variantes d'animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };
    
    return (
        <motion.div 
            ref={ref}
            className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", className)}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {memoizedGallery.map((item, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                >
                    <PictureCard url={item.url} alt={item.alt} backgroundColor={backgroundColor} />
                </motion.div>
            ))}
        </motion.div>
    )       
}

export default memo(GalleryInsta); 
GalleryInsta.displayName = "GalleryInsta";