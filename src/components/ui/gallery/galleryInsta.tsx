import PictureCard  from "@/components/ui/card/picture.Card";
import { cn } from "@/lib/utils";

export interface IGalleryInsta {
    url: string;
    alt: string;
}

export type GalleryInstaArray = IGalleryInsta[];

const GalleryInsta = ({gallery, className, backgroundColor}: {gallery: GalleryInstaArray, className?: string, backgroundColor?: string}) => {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", className)}>
            {gallery.map((item, index) => (
                <PictureCard key={index} url={item.url} alt={item.alt} backgroundColor={backgroundColor} />
            ))}
        </div>
    )
}

export default GalleryInsta;    
GalleryInsta.displayName = "GalleryInsta";