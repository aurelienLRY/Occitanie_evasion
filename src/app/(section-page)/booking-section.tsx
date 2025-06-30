
import Link from "next/link";
import { buttonVariants as style } from "@/components/ui/button";
import CustomSection from "@/components/layout/Section";
import { cn } from "@/lib/utils";

 const BookingSection = ( { className }: { className?: string } ) => {
    return (
        <CustomSection className={`flex flex-col gap-6 w-full min-h-[400px] lg:min-h-[500px] bg-secondary justify-center items-center text-white ${className}`}
        TopMarker={true} BottomMarker={true} Markercolor="secondary"
        >
            <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl lg:text-6xl text-center">Tu sais déjà ce que tu veux ? <br /> Réserve ta sortie en quelques clics !</h2>
            
            </div>
            <div className="flex flex-col items-center justify-center gap-6">
                <span className="text-2xl lg:text-4xl mt-4 ">👇</span>
                    <Link href="#" className=" bg-white text-black  text-xl px-4 py-2 rounded-lg hover:scale-105 hover:bg-white/80 transition-all duration-300">Go pour l’aventure !</Link>
              
            </div>

        </CustomSection>
    )
 }

 export default BookingSection;
 BookingSection.displayName = "BookingSection";