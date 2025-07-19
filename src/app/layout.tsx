import type { Metadata } from "next";
/*import "./globals.css";*/
import { Permanent_Marker , Slackside_One , Nunito} from "next/font/google";
import "@/styles/globals.css"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "../components/providers/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Occitanie Évasion |Spécialisé dans l'encadrement et la découverte des sports de plein air ",
  description: "Évadez-vous en pleine nature au cœur de l'Occitanie",
  keywords : "Canyoning, Escalade, Spéléologie, Via Corda ",
  authors: [{ name: "Occitanie Évasion", url: "https://www.occitanie-evasion.fr" }],
};

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-permanent-marker",
});

const slacksideOne = Slackside_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-slackside-one",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning
      className=" bg-background text-text"
    >
      <body
        className={`  ${permanentMarker.variable} ${slacksideOne.variable} ${nunito.variable} antialiased `}
      >
        <QueryProvider>
          <ThemeProvider>
            <Header  className="absolute top-0 left-0 w-full"/>
            <main className=" flex flex-col  min-h-[calc(100vh-187px)] relative " >{children}</main>
            <Footer />
            <Toaster 
              position="bottom-right"
              richColors
              closeButton
              duration={4000}
            />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
