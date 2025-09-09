import Image from "next/image";
import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg";
import { cn } from "@/lib/utils";



const PictureCard = ({url, alt , backgroundColor = "white"}: {url: string, alt: string, backgroundColor?: string}) => {
    return (
        <div className={cn("relative min-h-[250px] lg:min-h-[400px] lg:h-full max-h-[400px] aspect-square overflow-hidden ", backgroundColor ? `text-${backgroundColor}` : "text-white")}  >
            <MarkerLineSvg className={cn("w-[145%] h-16 absolute -top-8 left-1/2 -translate-x-1/2  rotate-180 z-10" , backgroundColor ? `text-${backgroundColor}` : "text-white")}  preserveAspectRatio="none"  />   
            <MarkerLineSvg className={cn("w-[145%] h-16 absolute -bottom-8  left-1/2 -translate-x-1/2  z-10" , backgroundColor ? `text-${backgroundColor}` : "text-white")}  preserveAspectRatio="none" />   
            <MarkerLineSvg className={cn("w-[145%] h-16 absolute top-1/2  right-0 translate-x-1/2 -translate-y-1/2 rotate-90 z-10" , backgroundColor ? `text-${backgroundColor}` : "text-white")}  preserveAspectRatio="none" />   
            <MarkerLineSvg className={cn("w-[145%] h-16 absolute top-1/2  left-0 -translate-x-1/2 -translate-y-1/2 -rotate-90 z-10" , backgroundColor ? `text-${backgroundColor}` : "text-white")}  preserveAspectRatio="none" />   
            
            <Image src={url} alt={alt} fill className="object-cover" loading="eager"/>
        </div>
    )
}

export default PictureCard; 
PictureCard.displayName = "PictureCard";