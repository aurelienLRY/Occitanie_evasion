import Image from "next/image";
import activities from "@/data/activities";
import Link from "next/link";
import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg";

interface ActivityLink {
    href: string;
    label: string;
    style: string;
  }
  
  interface Activity {
    image: string;
    alt: string;
    title: string;
    text: string;
    links: ActivityLink[];
  }



const BannerServices = ( { className }: { className?: string } ) => {
  return (



    <div className={`
      grid grid-cols-1 gap-2
      sm:grid-cols-2
      lg:flex lg:flex-row lg:gap-0
      w-full min-h-[60vh] relative overflow-hidden 
      lg:bg-black
      px-4 lg:px-0
   
      ${className}
    `}>
      <MarkerLineSvg className={"hidden lg:block w-[135vw] h-10 absolute -top-6  left-1/2 -translate-x-1/2 text-background  rotate-180   z-30 "}  preserveAspectRatio="none"/>
      <MarkerLineSvg className={"hidden lg:block w-[135vw] h-10 absolute -bottom-6  left-1/2 -translate-x-1/2  text-background   z-30 "}  preserveAspectRatio="none"/>
    {
      activities.map((activity: Activity, idx: number) => (
        <div
          key={idx}
          className="
            relative overflow-hidden group
            aspect-square
            rounded-xl
            flex-1
            hover:flex-2
           bg-black
            transition-all duration-600
            lg:aspect-auto
            lg:rounded-none
            min-w-[300px]
            hover:scale-105
            lg:hover:scale-100
            
           
         
          "
        >
           <MarkerLineSvg className={" lg:hidden w-[135%] h-10 absolute -top-6  left-1/2 -translate-x-1/2 text-background rotate-180   z-30 "}  preserveAspectRatio="none"/>
           <MarkerLineSvg className={" lg:hidden w-[135%] h-10 absolute -bottom-6  left-1/2 -translate-x-1/2 text-background     z-30 "}  preserveAspectRatio="none"/>
           <MarkerLineSvg className={" lg:hidden w-[135%] h-10 absolute top-1/2  right-0.5 translate-x-1/2 -translate-y-1/2 rotate-90 text-background     z-30 "}  preserveAspectRatio="none"/>
           <MarkerLineSvg className={" lg:hidden w-[135%] h-10 absolute top-1/2  left-0.5 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-background     z-30 "}  preserveAspectRatio="none"/>
          <div className="relative w-full h-full">
            <Image 
              src={activity.image} 
              alt={activity.alt} 
              fill 
              className="object-cover object-[70%_50%] w-full h-full opacity-30 lg:opacity-100 lg:group-hover:opacity-30 transition-all duration-500 " 
            />
            {/* Dégradé noir à transparent plus souple sur les côtés */}
            <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
              <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black  via-10% to-transparent" />
              <div className="absolute inset-y-0 right-0 w-1/5   bg-gradient-to-l from-black  via-10% to-transparent" />
            </div>
          </div>
          <div className="absolute top-[10%] lg:top-[30%] left-[5%] lg:group-hover:left-[25%] transition-all duration-500  min-w-min w-[80%] lg:w-[60%] max-w-max    flex flex-col gap-2 overflow-hidden z-10 px-4 lg:px-0 ">
            <h3 className="!text-6xl lg:!text-7xl break-words font-bold text-white mb-2 drop-shadow-lg leading-none ">
              {activity.title}
            </h3>
            <p className={`text-white text-lg text-justify ${BannerTextAnimation} `}>
              {activity.text}
            </p>
            <div className={`flex flex-row gap-2 ${BannerTextAnimation} `}>
                {activity.links.map((link: ActivityLink, idx: number) => (
                    <Link href={link.href} key={idx} className={`${link.style === "primary" ? 
                    " border border-white hover:bg-white hover:text-black hover:border-primary text-white transition-all duration-300" : "bg-secondary text-white"} px-4 py-2 rounded-md transition-all duration-300`}>
                        {link.label}
                    </Link>
                ))}
            </div>
          </div>
        </div>
      ))
    }
  </div>
  
  );
};

export default BannerServices;
BannerServices.displayName = "BannerServices";

 const BannerTextAnimation = " lg:translate-y-50 lg:opacity-0  translate-y-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 overflow-hidden"