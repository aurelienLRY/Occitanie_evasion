import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg";
import { Carousel } from "@/components/ui/Carrousel";
import { ActivityFormulas, ActivitySpots } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

const SpeleoPage = () => {
    return (
        <section className=" flex flex-col gap-16 items-center">
            <aside className="relative w-full h-full min-h-[800px]  overflow-x-clip mb-16">
                <Image src="/images/speleo.jpg" alt="Spéléologie" fill className=" object-cover" />
                <div className=" max-w-[500px] flex flex-col gap-4 absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 text-white">
                    <h1>Spéléologie</h1>
                    <p>La spéléologie est une activité qui consiste à explorer les grottes et cavités souterraines en utilisant des techniques d&apos;exploration et de sécurité.</p>
                </div>
                <MarkerLineSvg className="absolute -bottom-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
            </aside>

            {/* description */}
            <article className=" w-full flex flex-col gap-6 px-16 items-center">
                <div className="flex items-center justify-start w-full max-w-[80vw] min-w-[350px]">
                    <div className=" max-w-[750px] flex flex-col gap-4">
                        <h2>Explore les merveilles souterraines <span className="text-primary">!</span></h2>
                        <p>Envie de découvrir un monde caché sous tes pieds ? Nos grottes et cavités de la région t&apos;attendent pour une aventure souterraine fascinante ! Galeries, stalactites, rivières souterraines… Un univers mystérieux à explorer.</p>
                    </div>
                </div>
                <div className="flex items-center justify-end w-full max-w-[80vw] min-w-[350px]">
                    <div className=" max-w-[750px] flex flex-col gap-4">
                        <h2>Qu&apos;es aquò<span className="text-primary ">?</span></h2>
                        <p>C&apos;est explorer les grottes en toute sécurité ! Casque, lampe frontale, combinaison… On t&apos;équipe pour l&apos;aventure souterraine. Pas besoin d&apos;être un(e) explorateur(trice) : on découvre ensemble, chacun à son rythme.</p>
                    </div>
                </div>
            </article>

            {/* carrousel */}
            <div className="w-full flex flex-col gap-6  items-center min-h-[500px] relative " >
                <div className="absolute h-full w-1/3 top-0 left-0  z-50">
                    <div className="w-full h-full   bg-white/30 p-4 rounded-lg flex flex-col justify-center px-12 gap-0">
                        <p className="text-white/90 font-title text-2xl font-bold ">Ils l&apos;ont fait !</p>
                        <p className=" text-white font-title text-6xl  ">Pourquoi pas toi <span className="text-primary">?</span></p>
                        <Link href="/reservation" className="text-white  bg-primary/80 px-4 py-2 rounded-lg w-fit mt-6 hover:bg-primary transition-all duration-300">
                            Réserver
                        </Link>
                    </div>
                </div>
                <Carousel slidesToShow={1} autoPlay={true} showDots={true} showArrows={false} showPlayPause={false} markerLineSvg={true} markerLineSvgColor="white" className="w-full h-full ">
                    <div className="w-full h-[800px]">
                        <Image src="/images/speleo.jpg" alt="Spéléologie" fill className=" object-cover" />
                    </div>
                    <div className="w-full h-[800px]">
                        <Image src="/images/pexels-pixabay-461593.jpg" alt="Spéléologie" fill className=" object-cover" />
                    </div>
                </Carousel>
            </div>

            {/* Formules */}
            <div className="w-full flex flex-col gap-6 px-16 items-center">
                <h2>Deux formules selon ton envie</h2>
                <ActivityFormulas 
                    activityName="Spéléologie" 
                    reducedPriceConditions="Tarif réduit applicable pour les enfants de moins de 12 ans, les étudiants et les groupes de plus de 5 personnes. Réservation à l'avance requise."
                />
            </div>

            {/* Spots */}
            <ActivitySpots activityName="Spéléologie" />

            <article className="w-full flex flex-col gap-6 px-16 " >
                <h2 className="text-primary">À savoir avant d&apos;explorer : </h2>
                <ol>
                    <li>🔹 Il faut être en forme physique générale</li>
                    <li>🔹 Pas de claustrophobie</li>
                    <li>🔹 Il faut aimer l&apos;obscurité et les espaces confinés</li>
                    <li>🔹 Activité accessible dès 10 ans</li>
                </ol>
            </article>
        </section>
    );
};

export default SpeleoPage;