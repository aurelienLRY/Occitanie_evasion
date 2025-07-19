//import { ThemeSwitch } from "@/components/ui/ToogleTheme";
import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg"
import { cn } from "@/lib/utils";
import { Facebook, Instagram } from "lucide-react"
import Link from "next/link";

const Footer = () => {
    const FooterLinkClassName = "text-white/70 text-sm hover:text-secondary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary rounded-md p-1"

    return (
        <footer 
            className="flex flex-col gap-8 p-4 bg-primary text-white min-h-[100px] mt-14 relative max-w-screen overflow-x-clip"
            role="contentinfo"
            aria-labelledby="footer-title"
        >
            <MarkerLineSvg
                className="absolute -top-1 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[130vw] h-10 text-primary"
                preserveAspectRatio="none"
                aria-hidden="true"
            />

            <h2 id="footer-title" className="sr-only">
                Pied de page - Occitanie Évasion
            </h2>

            <div className="flex flex-col gap-4 lg:flex-row justify-around w-full">
                {/* Réseaux sociaux - Desktop */}
                <div className="hidden lg:flex flex-col text-center lg:text-left">
                    <h3 className="sr-only">Réseaux sociaux</h3>
                    <nav aria-label="Réseaux sociaux" className="flex gap-1 items-center">
                        <Link 
                            href="https://www.facebook.com/occitanie.evasion/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={cn(FooterLinkClassName, "hover:text-secondary")}
                            aria-label="Visiter notre page Facebook (s'ouvre dans un nouvel onglet)"
                        >
                            <Facebook className="w-8 h-8" aria-hidden="true" />
                        </Link>
                        <Link 
                            href="https://www.instagram.com/occitanie_evasion/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={cn(FooterLinkClassName, "hover:text-secondary")}
                            aria-label="Visiter notre page Instagram (s'ouvre dans un nouvel onglet)"
                        >
                            <Instagram className="w-8 h-8" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>

                {/* Informations de contact */}
                <div className="flex flex-col text-center">
                    <h3 className="sr-only">Informations de contact</h3>
                    <nav aria-label="Informations de contact" className=" flex flex-col">
                        <Link 
                            href="/" 
                            className={cn(FooterLinkClassName, "text-lg")}
                            aria-label="Retour à l'accueil"
                        >
                            Occitanie Évasion
                        </Link>
                        <Link 
                            href="mailto:contact@occitanie-evasion.com" 
                            className={cn(FooterLinkClassName)}
                            aria-label="Envoyer un email à contact@occitanie-evasion.com"
                        >
                            contact@occitanie-evasion.com
                        </Link>
                        <Link 
                            href="tel:0669696969" 
                            className={cn(FooterLinkClassName)}
                            aria-label="Appeler le 06 20 56 25 07"
                        >
                           06 20 56 25 07
                        </Link>
                    </nav>
                    
                    {/* Réseaux sociaux - Mobile */}
                    <div className="flex lg:hidden gap-1 items-center justify-center lg:justify-start mt-2">
                        <h4 className="sr-only">Réseaux sociaux</h4>
                        <nav aria-label="Réseaux sociaux" className="flex   gap-1">
                            <Link 
                                href="https://www.facebook.com/occitanie.evasion/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={cn(FooterLinkClassName, "hover:text-secondary")}
                                aria-label="Visiter notre page Facebook (s'ouvre dans un nouvel onglet)"
                            >
                                <Facebook className="w-6 h-6" aria-hidden="true" />
                            </Link>
                            <Link 
                                href="https://www.instagram.com/occitanie_evasion/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={cn(FooterLinkClassName, "hover:text-secondary")}
                                aria-label="Visiter notre page Instagram (s'ouvre dans un nouvel onglet)"
                            >
                                <Instagram className="w-6 h-6" aria-hidden="true" />
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Liens légaux */}
                <div className="flex flex-col text-center">
                    <h3 className="sr-only">Liens légaux</h3>
                    <nav aria-label="Liens légaux" className="flex flex-col">
                        <Link 
                            href="/faq" 
                            className={cn(FooterLinkClassName)}
                            aria-label="Consulter la FAQ"
                        >
                            FAQ
                        </Link>
                        <Link 
                            href="/mention-legal" 
                            className={cn(FooterLinkClassName)}
                            aria-label="Consulter les mentions légales"
                        >
                            Mentions légales
                        </Link>
                        <Link 
                            href="/politique-de-confidentialite" 
                            className={cn(FooterLinkClassName)}
                            aria-label="Consulter la politique de confidentialité"
                        >
                            Politique de confidentialité
                        </Link>
                    </nav>
                </div>
            </div>

            <div className="flex flex-col w-full">
                {/* <div className="flex items-center justify-center gap-1">
                    <span className="text-white/70 text-sm">Changer de thème</span>
                    <ThemeSwitch />
                </div> */}

                <p className="text-white/50 text-sm text-center">
                    © 2025 Occitanie Évasion. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
