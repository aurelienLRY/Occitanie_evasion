
import Image from "next/image";
import CustomSection from "@/components/layout/Section";

export const HeroSection = ({ className }: { className?: string }) => {
  return (
    <CustomSection 
    className={`flex flex-col w-full relative  ${className}`} 
    role="banner" aria-label="Occitanie Évasion"  
    BottomMarker={true}
  
   >
      <Image src="/images/Canyoning_Home.webp" alt="Occitanie Évasion"
        width={8256}
        height={5504}
        className=" object-cover object-center  max-h-[800px] " />
      <div className="relative z-10">

        <div className="flex flex-col items-center justify-center bg-white   rounded-2xl
       absolute top-1/3 left-1/2 -translate-x-1/2  -translate-y-1/2 min-w-[180px] w-[10vw] sm:w-[40vw] md:w-[50vw] max-w-[300px] shadow-md aspect-square p-4 ">
       
        <Image src="/logo.svg" fill className="object-contain" alt="Logo de l'entreprise "/>
   
          {/* <h1 className="text-4xl sm:text-6xl lg:text-8xl text-secondary text-center">Occitanie Évasion</h1> */}
          {/* <h2 className="text-sm sm:text-lg lg:text-3xl text-center font-paragraphe" style={{fontSize: "clamp(1rem, 2vw, 1.5rem)"}}>Professionnel des activités nature en Occitanie ! </h2> */}
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