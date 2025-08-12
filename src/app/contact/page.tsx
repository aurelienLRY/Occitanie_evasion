import CustomSection from "@/components/layout/Section";
import ContactForm from "@/components/form/contact";
import { ProfileCard } from '@/components/ui/card';

const ContactPage = () => {
    return (
        <CustomSection
            className="min-h-[100vh] w-full mx-auto flex flex-col gap-12 justify-center relative max-w-7xl mt-20 px-4"
        >
                <div className="text-center lg:text-left">
                    <h1 className="!text-4xl md:!text-6xl font-bold mb-4">Une question , une idée , un besoin spécifique <span className="text-secondary">?</span></h1>
                    <h2 className=" font-paragraphe !text-lg md:!text-xl  opacity-80 ">
                      Je serai ravis d&apos;échanger avec toi directement par téléphone, par email ou via le formulaire ci-dessous. 😉
                    </h2>
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

export default ContactPage;
ContactPage.displayName = "ContactPage";