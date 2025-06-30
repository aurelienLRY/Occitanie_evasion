import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Canyoning | Occitanie Évasion",
    description: "Découvrez les canyons de l'Aude et de l'Hérault",
    keywords: "Canyoning, Canyons, Aude, Hérault, Occitanie, Evasion",
    authors: [{ name: "Occitanie Évasion", url: "https://www.occitanie-evasion.fr" }],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}