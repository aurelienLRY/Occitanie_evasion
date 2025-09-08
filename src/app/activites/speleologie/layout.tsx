import type { Metadata } from "next";



export const metadata: Metadata = {
    title: "Spéléologie | Occitanie Évasion",
    description: "Découvrez les spéléologies de l'Occitanie",
    keywords: "Spéléologie, Occitanie, Evasion",
    authors: [{ name: "Occitanie Évasion", url: "https://www.occitanie-evasion.com" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}