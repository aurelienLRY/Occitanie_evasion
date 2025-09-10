
import Image from "next/image";
import CustomSection from "@/components/layout/Section";
import { useIsMobile } from "@/hooks";



export const HeroSection = ({ className }: { className?: string }) => {

  
   const isMobile = useIsMobile();

  return (
    <CustomSection 
      className={`flex flex-col w-full relative ${className}`} 
      role="banner" 
      aria-label="Occitanie Évasion"  
      BottomMarker={true}
    >
    
       {isMobile ? (   
        <Image 
          src="/images/Home/Canyoning_Home-Mobile.webp" 
          alt="Occitanie Évasion - Activités de plein air en Occitanie"
          width={500}
          height={365}
          priority
          className="object-cover object-center w-full  " 
        /> ) : (
        <Image 
          src="/images/Home/Canyoning_Home-780px.webp" 
          alt="Occitanie Évasion - Activités de plein air en Occitanie"
          width={1920}
          height={780}
          priority
          className="object-cover object-center w-full  " 
        /> )}


      <div className="relative z-10">

        <div className="flex flex-col items-center justify-center bg-white rounded-2xl
       absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 
       min-w-[180px] w-[10vw] sm:w-[40vw] md:w-[50vw] max-w-[300px] 
       shadow-md aspect-square p-4 
       will-change-transform"
       style={{ 
         contain: 'layout style paint',
       }}>
       
        <Image 
          src="/logo.svg" 
          fill 
          className="object-contain" 
          alt="Logo Occitanie Évasion - Activités de plein air"
          priority
          sizes="(max-width: 768px) 180px, (max-width: 1024px) 300px, 300px"
        />
   
           <h1 className="hidden ">Occitanie Évasion , spécialiste des activités nature en Occitanie ! </h1> 
           <h2 className="hidden" style={{fontSize: "clamp(1rem, 2vw, 1.5rem)"}}>Professionnel des activités nature en Occitanie ! </h2> 
        </div>
      </div>
    </CustomSection>
  )
}


HeroSection.displayName = "HeroSection";