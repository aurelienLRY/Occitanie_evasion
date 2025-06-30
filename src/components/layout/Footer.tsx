import { ThemeSwitch } from "@/components/ui/ToogleTheme/ToogleTheme";
import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg"
import { cn } from "@/lib/utils";
import { Facebook , Instagram } from "lucide-react"
import Link from "next/link";
const Footer = () => {
 const FooterLinkClassName = "text-white/70 text-sm hover:text-secondary transition-colors  duration-300"

    return (
        <footer className="flex justify-around items-center p-4 bg-primary text-white min-h-[100px] mt-14 relative">
            <MarkerLineSvg
                className="absolute -top-1 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[130vw] h-10 text-primary "
                preserveAspectRatio="none" />
            <div className="flex flex-col ">    
                <div className="flex gap-1   items-center  ">
                    <Link href="https://www.facebook.com/occitanie.evasion/" target="_blank" className={cn(FooterLinkClassName , "hover:text-secondary")}><Facebook className="w-6 h-6" /></Link>
                    <Link href="https://www.instagram.com/occitanie_evasion/" target="_blank" className={cn(FooterLinkClassName , "hover:text-secondary")}><Instagram className="w-6 h-6" /></Link>
                </div>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-white/70 text-sm">Thème</span>
                    <ThemeSwitch />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center ">
                    <Link href="/" className={cn(FooterLinkClassName , "text-lg")}>Occitanie Evasion</Link>
                    <Link href="/" type="email" className={cn(FooterLinkClassName )}>contact@occitanie-evasion.com</Link>
                    <Link href="/" type="tel" className={cn(FooterLinkClassName )}>06 69 69 69 69</Link>


                </div>
            
            </div>
            <div className="flex flex-col ">
            <Link href="/faq" className={cn(FooterLinkClassName)}>FAQ</Link>

                <Link href="/mention-legal" className={cn(FooterLinkClassName)}>Mentions légales</Link>
                <Link href="/politique-de-confidentialite" className={cn(FooterLinkClassName)}>Politique de confidentialité</Link>



            </div>

        </footer>
    );
};

export default Footer;
