import BannerServices from "@/components/ui/banner-services";
import  { Separateur2 } from "@/components/ui/svg/Separateur";
import CustomSection from "@/components/layout/Section";

const ServicesSection = ( { className }: { className?: string } ) => {
    return (
        <CustomSection className={`flex flex-col gap-11 items-center justify-center w-full      ${className}`} >
            <div className="flex flex-col justify-center w-full max-w-7xl mx-auto px-4 lg:px-0 relative ">
                <h3 className="!text-6xl lg:!text-8xl text-center lg:text-start  ">L&apos;évasion commence ici <span className="text-secondary">!</span></h3>
                <h2 className="!text-4xl lg:!text-6xl text-center lg:text-start   ">Tu cherches une activité <span className="text-secondary">?</span></h2>
                <p className="mt-8 text-lg opacity-80 text-center lg:text-start"><strong>Choisis ton terrain de jeu </strong>et laisse-toi guider pour une <strong> aventure 100 % nature,  sensations et  bonne humeur!</strong> <br />  Que tu viennes solo, en famille, en comité d&apos;entreprise ou pour un EVG/EVJF, il y a forcément une expérience faite pour toi. </p>
                {/* <Separateur className="h-24 w-full text-secondary mt-3" /> */}
                <Separateur2 className="h-32 w-full text-secondary mt-8"/>
            </div>
            <BannerServices />
        </CustomSection>
    )
}

ServicesSection.displayName = "ServicesSection";
export default ServicesSection;