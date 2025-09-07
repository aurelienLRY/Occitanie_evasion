"use client"
import PictureCard  from "@/components/ui/card/picture.Card";
import { useIsMobile } from "@/hooks";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";

export interface IGalleryInsta {
    url: string;
    alt: string;
}

export type GalleryInstaArray = IGalleryInsta[];

const GalleryInsta = ({gallery, className, backgroundColor = 'white'}: {gallery: GalleryInstaArray, className?: string, backgroundColor?: string}) => {
    const isMobile = useIsMobile();

    const memoizedGallery = useMemo(() => {
        if(isMobile) {
            return gallery.slice(0, 3);
        }
        return gallery;
    }, [isMobile, gallery]);

   
    
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", className)}>
            {memoizedGallery.map((item, index) => (
                <PictureCard key={index} url={item.url} alt={item.alt} backgroundColor={backgroundColor} />
            ))}
        </div>
    )       
}

export default memo(GalleryInsta); 
GalleryInsta.displayName = "GalleryInsta";