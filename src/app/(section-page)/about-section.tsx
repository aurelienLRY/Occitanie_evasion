import Image from "next/image";

export const AboutSection = ( { className }: { className?: string } ) => {
    return (
        <section className={`flex flex-col-reverse lg:flex-row  lg:gap-6  w-full py-12   overflow-hidden ${className}`}>
           

            <div className="flex flex-col max-w-4xl">
                <h2 className="text-6xl lg:text-8xl text-center lg:text-start ">Qui suis-je<span className="text-secondary">?</span></h2>

                <p className=" text-justify mt-4">
                    Je m’appelle <span className="font-bold">Florent Soum </span>, et j’ai la chance d’exercer un métier qui me passionne depuis plus de 15 ans : <wbr />
                    <strong> accompagner petits et grands dans l’exploration de la nature</strong> à travers des activités riches en émotions et en découvertes. <br />
                    <strong className=""> <span className="text-xl">🌿</span>Canyoning, escalade, spéléologie, via corda… </strong>autant de façons de se reconnecter à soi, aux autres, et à notre belle région !<br />
                </p>

                <p className=" mt-2 text-justify "> <strong>Diplômé en escalade, spéléologie, canoë-kayak et disciplines associées,</strong> je mets un point d’honneur à vous guider en toute sécurité, avec bienveillance, écoute et bonne humeur.
                </p>
                <p className=" text-justify ">
                    En 2022, j’ai créé <span className="font-bold">Occitanie Évasion </span> pour proposer des <span className="font-bold"> aventures à taille humaine</span>, où l’essentiel est dans le partage, la rencontre et les moments simples vécus en pleine nature.
                </p>
                <h3 className="mt-4 text-4xl lg:text-6xl text-center lg:text-start text-secondary mb-2">Mon objectif ?</h3>
                <p className=" text-justify ">
                    Vous offrir plus qu’une activité sportive : une parenthèse authentique, conviviale, respectueuse de chacun… et pleine de sourires !
                    <span className="text-secondary">😊</span>
                </p>


            </div>
            <div className="flex flex-col items-center justify-center w-full   lg:ml-12  lg:items-start p-4 lg:max-w-lg">
                <div className="relative min-w-[300px]">
                    <Image src="/images/Home/Florent-session_escalade.webp" alt="About" width={300} height={300} className="rounded-lg object-cover object-center  aspect-square shadow-md shadow-black/50  " />
                    <Image src="/images/Home/Florent-session_escalade.webp" alt="About" width={150} height={150}
                        className=" hidden lg:block rounded-lg object-cover object-center  aspect-square  absolute bottom-0 -left-10  translate-y-1/2 shadow-md shadow-black/50  " />
                </div>
            </div>


        </section>
    )
}


AboutSection.displayName = "AboutSection";
