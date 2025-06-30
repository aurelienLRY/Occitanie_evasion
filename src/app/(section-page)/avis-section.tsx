"use client";

import { cn } from "@/lib/utils";
import GoogleAvisCarousel from "@/components/ui/Carrousel/google-avis/google-avis.carousel";
import { useMockGoogleReviews , useScreenInfo } from "@/hooks";
import  CustomSection  from "@/components/layout/Section";

const AvisSection = ({className}: {className?: string}) => {
    const { data, loading, error } = useMockGoogleReviews();
    const { isXs, isSm, isMd, isLg, } = useScreenInfo();
    
    // Logique pour slidesToShow : 1 pour xs/sm, 4 pour md et au-dessus
    const slidesToShow = isXs || isSm ? 1 : isMd ? 2 : isLg ? 3 : 3;
    
    return (
        <CustomSection className={cn(" min-h-[80vh] w-full mx-auto   flex flex-col justify-center", className)}
        TopMarker={true}
        BottomMarker={true}
        >
            <div className="flex flex-col justify-center gap-8  w-full max-w-7xl mx-auto">
            <div className="text-center lg:text-left">
                <h2 className="text-8xl font-bold mb-4">Ils nous ont fait confiance <span className="text-secondary">!</span></h2>
                <h3 className="text-4xl opacity-70">Toi aussi, réservez ta sortie <span className="text-secondary opacity-70">!</span></h3> 
            </div>
           
            <div className="w-full ">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-600">
                        <p>Erreur lors du chargement des avis</p>
                    </div>
                ) : data ? (
                    <>
                    <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">
                      {data.rating.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Note moyenne</div>
                  </div>
                    <GoogleAvisCarousel
                        reviews={data.reviews}
                        autoPlay={true}
                        autoPlayInterval={4000}
                        showDots={true}
                        showArrows={false}
                        showPlayPause={false}
                        showProgressBar={false}
                        slidesToShow={slidesToShow}
                        infinite={true}
                        className="w-full"
                        cardClassName="bg-white/90 backdrop-blur-sm"
                    />  
                    </>
                ) : (
                    <div className="text-center text-gray-500">
                        <p>Aucun avis disponible</p>
                    </div>
                )}
            </div>
            </div>
    
        </CustomSection>
    )
}

export default AvisSection;
AvisSection.displayName = "AvisSection";