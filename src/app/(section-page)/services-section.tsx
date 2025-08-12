import BannerServices from "@/components/ui/banner-services";
import  { Separateur2 } from "@/components/ui/svg/Separateur";
import CustomSection from "@/components/layout/Section";

const ServicesSection = ( { className }: { className?: string } ) => {
    return (
        <CustomSection className={`flex flex-col gap-11 items-center justify-center w-full      ${className}`} >
            <div className="flex flex-col justify-center w-full max-w-7xl mx-auto  relative ">
                <h2 className="text-6xl lg:text-8xl text-center lg:text-start  ">Tu cherche une activité <span className="text-secondary">?</span></h2>
                <h3 className="text-4xl text-center lg:text-start ">Envie de troquer le bitume et les écrans contre les cascades et les falaises <span className="text-secondary">?</span></h3>
                <p className="mt-2 text-lg opacity-80 text-center lg:text-start"><strong>Choisis ton terrain de jeu </strong>et laisse-toi guider pour une <strong> aventure 100 % nature, 100 % sensations, 100 % bonne humeur!</strong>  Que tu sois solo, en famille ou en mode team-building, il y a forcément une évasion faite pour toi. </p>
                {/* <Separateur className="h-24 w-full text-secondary mt-3" /> */}
                <Separateur2 className="h-32 w-full text-secondary mt-3"/>
            </div>
            <BannerServices />
        </CustomSection>
    )
}

ServicesSection.displayName = "ServicesSection";
export default ServicesSection;