
import Image from "next/image";
import CustomSection from "@/components/layout/Section";
import { Suspense } from "react";

// Composant de fallback pour le chargement
const HeroFallback = () => (
  <div className="w-full h-[950px] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
    <div className="animate-pulse">
      <div className="w-32 h-32 bg-white/30 rounded-2xl"></div>
    </div>
  </div>
);

export const HeroSection = ({ className }: { className?: string }) => {
  return (
    <CustomSection 
      className={`flex flex-col w-full relative ${className}`} 
      role="banner" 
      aria-label="Occitanie Évasion"  
      BottomMarker={true}
    >
      <Suspense fallback={<HeroFallback />}>
        <Image 
          src="/images/Home/Canyoning_Home.webp" 
          alt="Occitanie Évasion - Activités de plein air en Occitanie"
          width={1920}
          height={1280}
          priority
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          sizes="100vw"
          className="object-cover object-center max-h-[950px] w-full" 
        />
      </Suspense>
      <div className="relative z-10">

        <div className="flex flex-col items-center justify-center bg-white rounded-2xl
       absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 
       min-w-[180px] w-[10vw] sm:w-[40vw] md:w-[50vw] max-w-[300px] 
       shadow-md aspect-square p-4 
       will-change-transform"
       style={{ 
         contain: 'layout style paint',
         transform: 'translate(-50%, -50%)'
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



      {/* 
      <RotatingText
        texts={['Canyoning', 'Escalade', 'Spéléologie', 'Via Corda']}
        mainClassName="px-2 sm:px-2 md:px-3   overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center text-8xl font-heaters"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={3000}
      />*/}
    </CustomSection>
  )
}


HeroSection.displayName = "HeroSection";