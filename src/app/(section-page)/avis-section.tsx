"use client";

import { cn } from "@/lib/utils";
import GoogleReviews from "@/components/ui/googleReviews";
import CustomSection from "@/components/layout/Section";
import { GOOGLE_REVIEWS_CONFIG } from "@/config/business-information";

const AvisSection = ({className}: {className?: string}) => {
    return (
        <CustomSection className={cn(" min-h-[80vh] w-full mx-auto   flex flex-col justify-center", className)}
        TopMarker={true}
        BottomMarker={true}
        >
            <div className="flex flex-col justify-center gap-8  w-full max-w-7xl mx-auto mt-20">
            <div className="text-center lg:text-left">
                <h2 className="text-6xl lg:text-8xl font-bold mb-4">Ils m&apos;ont fait confiance <span className="text-secondary">!</span></h2>
                <h3 className="text-2xl lg:text-4xl opacity-70">Toi aussi, réservez ta sortie <span className="text-secondary opacity-70">!</span></h3> 
            </div>
           
            <div className="w-full mb-12">
                <GoogleReviews 
                    featurableId={GOOGLE_REVIEWS_CONFIG.featurableId}
                    className="w-full"
                    autoPlay={true}
                    autoPlayInterval={4000}
                    showDots={false}
                    showArrows={true}
                    showPlayPause={false}
                    slidesToShow={3}
                    infinite={true}
                />
            </div>
            </div>
    
        </CustomSection>
    )
}

export default AvisSection;
AvisSection.displayName = "AvisSection";