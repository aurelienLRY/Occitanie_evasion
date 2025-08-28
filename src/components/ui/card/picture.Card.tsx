import Image from "next/image";
import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg";
import { cn } from "@/lib/utils";



const PictureCard = ({url, alt , backgroundColor = "white"}: {url: string, alt: string, backgroundColor?: string}) => {
    return (
        <div className="relative min-h-[250px] max-h-[400px] aspect-square overflow-hidden ">
            <MarkerLineSvg className={cn("w-[135%] h-12 absolute -top-6  left-1/2 -translate-x-1/2  rotate-180 z-10" , backgroundColor ? `text-${backgroundColor}` : "text-background")}  preserveAspectRatio="none" />   
            <MarkerLineSvg className={cn("w-[135%] h-12 absolute -bottom-6  left-1/2 -translate-x-1/2  z-10" , backgroundColor ? `text-${backgroundColor}` : "text-background")}  preserveAspectRatio="none" />   
            <MarkerLineSvg className={cn("w-[135%] h-14 absolute top-1/2  right-0 translate-x-1/2 -translate-y-1/2 rotate-90 z-10" , backgroundColor ? `text-${backgroundColor}` : "text-background")}  preserveAspectRatio="none" />   
            <MarkerLineSvg className={cn("w-[135%] h-14 absolute top-1/2  left-0 -translate-x-1/2 -translate-y-1/2 -rotate-90 z-10" , backgroundColor ? `text-${backgroundColor}` : "text-background")}  preserveAspectRatio="none" />   
            
            <Image src={url} alt={alt} fill className="object-cover" loading="lazy"/>
        </div>
    )
}

export default PictureCard; 
PictureCard.displayName = "PictureCard";