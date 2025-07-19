import { HomeIcon, ContactIcon, BotIcon } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type TRoutes = {
    name: string;
    path: string;
    icon: LucideIcon;
}


export const AppRoutes: TRoutes[] = [
    {
        name: "Accueil",
        path: "/",
        icon: HomeIcon,
    }, 
     {
        name: "Canyoning",
        path: "/activites/canyoning",
        icon: BotIcon,
    },
    {
        name: "Escalade",
        path: "/activites/escalade",
        icon: BotIcon,
    },
    {
        name: "Spéléologie",
        path: "/activites/speleologie",
        icon: BotIcon,
    },
 
  
    {
        name: "Contact",
        path: "/contact",
        icon: ContactIcon,
    },
  
 
]

export default AppRoutes;
