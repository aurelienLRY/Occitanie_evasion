import { businessInformation } from "@/config/business-information";

export const metadata = {

    title: {
        template: `%s - ${businessInformation.name}`,
        default: `Contact - ${businessInformation.name}`,
    },
    description: "une question , une idée , un besoin spécifique ? je serai ravis d'échanger avec toi directement par téléphone, par email ou via le formulaire ci-dessous. 😉",
    openGraph: {
        title: businessInformation.name,
    }
}

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            {children}
        </div>
    )
}

export default ContactLayout;
ContactLayout.displayName = "ContactLayout";