import CustomSection from "@/components/layout/Section";
import ContactForm from "@/components/form/contact";
import { ProfileCard } from '@/components/ui/card';

const ContactSection = ({ className }: { className?: string }) => {
    return (
        <CustomSection
            className={`min-h-[80vh] w-full mx-auto   flex flex-col gap-12 justify-center relative max-w-7xl ${className}`}

        >
       
                <div className="text-center lg:text-left">
                    <h2 className="text-4xl md:text-8xl font-bold mb-4">Besoin d&apos;un coup de main pour choisir ton activité <span className="text-secondary">?</span></h2>
                    <p className=" text-lg md:text-xl  opacity-80 ">
                        Contact moi directement par téléphone, par email ou via le formulaire ci-dessous. Je suis là pour t&apos;aider à sauter… le pas 😉
                    </p>
                </div>
                <div className="flex flex-col items-center lg:flex-row gap-6 w-full ">
                    <div className=" lg:flex-1/3">
                        <ProfileCard />
                    </div>
                    <ContactForm className="w-full " />
                </div>
         
        </CustomSection>
    )
}

export default ContactSection;
ContactSection.displayName = "ContactSection";