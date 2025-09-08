import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Escalade | Occitanie Évasion",
    description: "Découvrez les escalades de l'Occitanie",
    keywords: "Escalade, Occitanie, Evasion",
    authors: [{ name: "Occitanie Évasion", url: "https://www.occitanie-evasion.com" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}