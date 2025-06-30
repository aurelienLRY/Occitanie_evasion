import { cn } from "@/lib/utils";
import { MarkerLineSvg } from "../ui/svg/MarkerLine.svg";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    TopMarker?: boolean;
    BottomMarker?: boolean;
    Markercolor?: string;
}

const CustomSection = ({children, className, TopMarker = false, BottomMarker = false, Markercolor = "background" , ...props}: SectionProps) => {
    return (
        <section className={cn(" relative ", className)} {...props}>
            { TopMarker && <MarkerLineSvg className={cn    ("w-[135vw] h-24 absolute -top-6  left-1/2 -translate-x-1/2  rotate-180  " , Markercolor ? `text-${Markercolor}` : "text-background")}  preserveAspectRatio="none"/>}
            { BottomMarker && <MarkerLineSvg className={cn    ("w-[135vw] h-24 absolute -bottom-6  left-1/2 -translate-x-1/2     " , Markercolor ? `text-${Markercolor}` : "text-background")}  preserveAspectRatio="none"/>}
            {children}
        </section>
    )
}

export default CustomSection;