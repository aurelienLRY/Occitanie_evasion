"use client"
import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg";
import { Carousel } from "@/components/ui/Carrousel";
import { ActivityFormulas, ActivitySpots } from "@/components/ui";
import Image from "next/image";
import { Info, Star, Users } from "lucide-react";
import ReservationLink from "@/components/ui/ReservationLink";
import { GalleryInsta} from "@/components/ui/gallery";
import { GalleryInstaArray } from "@/components/ui/gallery/galleryInsta";
import CustomSection from "@/components/layout/Section";
import ContactSection from "../../(section-page)/contact-section";
import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";


const CanyoningPage = () => {
    // Refs pour les sections à animer
    const descriptionRef = useRef(null);
    const carouselRef = useRef(null);
    const formulasRef = useRef(null);
    const spotsRef = useRef(null);
    const infoRef = useRef(null);

    // Détection de visibilité pour chaque section
    const descriptionInView = useInView(descriptionRef, { once: true, margin: "-100px" });
    const carouselInView = useInView(carouselRef, { once: true, margin: "-100px" });
    const formulasInView = useInView(formulasRef, { once: true, margin: "-100px" });
    const spotsInView = useInView(spotsRef, { once: true, margin: "-100px" });
    const infoInView = useInView(infoRef, { once: true, margin: "-100px" });

    // Variantes d'animation inspirées de la page home
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeOut
            }
        }
    };

    // Animation pour les blocs de description (gauche et droite)
    const leftBlockVariants = {
        hidden: { opacity: 0, x: -50, y: 20 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.7,
                ease: easeOut
            }
        }
    };

    const rightBlockVariants = {
        hidden: { opacity: 0, x: 50, y: 20 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.7,
                ease: easeOut
            }
        }
    };

    const gallery: GalleryInstaArray = [
        { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_8.webp", alt: "personne qui glisse dans une cascade" },
        { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_13.webp", alt: "photo des gorges du banquet" },
        { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_22.webp", alt: "personne qui réalise un saut dans une cascade" },
        { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_18.webp", alt: "personne qui réalise glisse dans un toboggan naturel" },
        { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_12.webp", alt: "personne qui réalise un saut " },
        { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_19.webp", alt: "photo d'une des cascades du canyon du banquet" },
        { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_28.webp", alt: "personne en pause le long d'un cours d'eau" },
        { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_34.webp", alt: "femme qui saute dans un cours d'eau" },
        { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_27.webp", alt: "vue d'ensemble des gorges du banquet" },
    ];
    return (
        <div className="flex flex-col gap-16 overflow-x-clip">
            <section className=" flex flex-col gap-8 items-center">
                <aside className="relative w-full h-full min-h-[800px]  overflow-x-clip mb-16">


                    <Image src="/images/Canyoning/canyoning-hero.webp" alt="Personne qui pratique le canyoning" fill className=" object-cover hidden md:block" priority/>
                    <Image src="/images/Canyoning/canyoning-hero-mobile.webp" alt="Personne qui pratique le canyoning" fill className=" object-cover md:hidden" priority/>


                    <div className=" max-w-[500px] w-[95%]  flex flex-col gap-4 absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 text-white  px-6 py-2 rounded-lg bg-black/20">
                        <h1>Canyoning à Mazamet</h1>
                        <h2 className="!text-3xl lg:!text-4xl">Fun et fraîcheur au cœur du Tarn</h2>
                        <h3 className="!text-lg font-paragraphe">Une randonnée aquatique dans les gorges sauvages du Banquet, à 10 min de Mazamet.</h3>
                    </div>
                    <MarkerLineSvg className="absolute -bottom-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
                </aside>

                {/* description */}
                <motion.article 
                    ref={descriptionRef}
                    className="container mx-auto space-y-16 px-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={descriptionInView ? "visible" : "hidden"}
                >
                    <motion.div 
                        className="flex items-center justify-start w-full max-w-[80vw] "
                        variants={leftBlockVariants}
                    >
                        <div className="space-y-4 max-w-[850px] text-justify">
                            <h2>Plonge dans l&apos;aventure sauvage <span className="text-primary">!</span></h2>
                            <p>Un moment d&apos;évasion sur le cours d&apos;eau de l&apos;Arn. Équipé d&apos;une combinaison néoprène et d&apos;un casque vous évoluez et progressez en sécurité, dans un environnement naturel remarquable façonné durant des milliers d&apos;années par le passage de l&apos;eau.</p>
                            <p>Le canyon du Banquet est idéal lorsque l&apos;on recherche <strong>sensations, rafraîchissement et découverte</strong>.</p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        className="flex items-center justify-end w-full max-w-[80vw] "
                        variants={rightBlockVariants}
                    >
                        <div className="space-y-4 max-w-[850px]text-justify">
                            <h2>Canyoning,<span className="text-4xl">🤔</span> qu&apos;es aquò<span className="text-primary">?</span></h2>
                            <p><strong>Au programme :</strong> sauts, toboggans naturels, nage en eaux vives et marche aux pieds des falaises granitiques.</p>
                            <p>C&apos;est une rando… mais dans l&apos;eau ! En combinaison néoprène, casque sur la tête et <strong>sourire aux lèvres, tu descends un cours d&apos;eau en mode aventure.</strong>  <strong> On avance ensemble, chacun à son rythme, dans la bonne humeur et en toute sécurité.</strong></p>
                            <p>Un parcours aquatique et ludique à partir de <strong>10 ans</strong>.</p>
                        </div>
                    </motion.div>
                </motion.article>


                {/* carrousel */}
                <motion.div 
                    ref={carouselRef}
                    className="w-full flex flex-col gap-6  items-center min-h-[500px] relative"
                    variants={itemVariants}
                    initial="hidden"
                    animate={carouselInView ? "visible" : "hidden"}
                >
                    <motion.div 
                        className="absolute w-[90%] min-h-[200px]  bottom-19 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:h-full lg:w-1/3 lg:top-0 lg:left-0  z-50"
                        variants={itemVariants}
                    >
                        <div className="w-full h-full   bg-white/30 p-4 rounded-lg flex flex-col justify-center px-12 gap-0">
                            <p className="text-white/90 py-4 font-title text-2xl lg:text-4xl font-bold ">Ils l&apos;ont fait !</p>
                            <p className=" text-white font-title text-4xl lg:text-6xl  ">Pourquoi pas toi <span className="text-primary">?</span></p>
                            <ReservationLink activity="canyoning" className="text-white  bg-primary/80 px-4 py-2 rounded-lg w-fit mt-6 hover:bg-primary transition-all duration-300">
                                Réserver
                            </ReservationLink>
                        </div>
                    </motion.div>
                    <Carousel slidesToShow={1} autoPlay={true} showDots={true} showArrows={false} showPlayPause={false} markerLineSvg={true} markerLineSvgColor="white" className="w-full h-full ">
                        <div className="w-full h-[800px]">
                            <Image src="/images/Canyoning/carrousel/canyoning_occitanie-evasion_1920_9.webp" alt="Canyoning" fill className=" object-cover" />
                        </div>
                            <div className="w-full h-[800px]">
                                <Image src="/images/Canyoning/carrousel/canyoning_occitanie-evasion_1920_21.webp" alt="Canyoning" fill className=" object-cover" />
                            </div>
                            <div className="w-full h-[800px]">
                                <Image src="/images/Canyoning/carrousel/canyoning_occitanie-evasion_1920_31.webp" alt="Canyoning" fill className=" object-cover" />
                            </div>
                            <div className="w-full h-[800px]">
                                <Image src="/images/Canyoning/carrousel/canyoning_occitanie-evasion_1920_26.webp" alt="Canyoning" fill className=" object-cover" />
                            </div>
                            <div className="w-full h-[800px]">
                                <Image src="/images/Canyoning/carrousel/canyoning_occitanie-evasion_1920_23.webp" alt="Canyoning" fill className=" object-cover" />
                            </div>
                    </Carousel>
                </motion.div>
                <motion.div 
                    ref={formulasRef}
                    className="w-full flex flex-col gap-6  items-center  relative"
                    variants={itemVariants}
                    initial="hidden"
                    animate={formulasInView ? "visible" : "hidden"}
                >
                    <h2 className="text-center lg:text-left">Deux formules selon ton envie</h2>
                    <ActivityFormulas
                        activityName="Canyoning"
                        description_half="Profitez de la partie haute du canyon du Banquet (du début au milieu des gorges) où s'enchaînent les sauts (jusqu'à 6/7m), parties de nage, cascades et toboggans naturels. Dans cette partie, la plus encaissée des gorges, partez à l'aventure pour environ 3h tout en prenant le temps d'observer notre nature sauvage environnante."
                        description_full="Le temps d'une journée, à votre rythme, descendez l'intégralité des gorges du banquet. Au départ de la partie haute du canyon vous enchaînez plusieurs sauts (jusqu'à 6/7m), toboggans naturels et nages dans les vasques. Après une pause pique-nique méritée sur les rochers (repas à prévoir), la deuxième partie est très ludique : toboggans naturels à faire et refaire, parties de nages, sauts et un final dont on se souvient !"
                        reducedPriceConditions="Tarif réduit pour les enfants jusqu'à 17 ans inclus et les groupes de minimum 7 personnes."
                        ACMPriceConditions="Tarif ACM : 8 enfants + 1 animateur max = 280€. Contactez-moi pour plus d'informations."
                    />
                </motion.div>

                <motion.div 
                    ref={spotsRef}
                    className="w-full flex flex-col gap-6 px-4 lg:px-16 items-center bg-primary py-16 relative min-h-[800px]"
                    variants={itemVariants}
                    initial="hidden"
                    animate={spotsInView ? "visible" : "hidden"}
                >
                    <MarkerLineSvg className="absolute -bottom-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
                    <MarkerLineSvg className="absolute -top-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
                    <div className="container mx-auto max-w-[1200px] space-y-16">
                        <h2 className="text-white text-6xl font-bold text-center ">Où je pratique le canyoning ?</h2>
                        <ActivitySpots activityName="Canyoning" />
                    </div>
                </motion.div>
   



                <motion.article 
                    ref={infoRef}
                    className="container mx-auto flex flex-col gap-6 lg:gap-12 px-4 lg:px-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={infoInView ? "visible" : "hidden"}
                >
                    <motion.h2 
                        className="text-center"
                        variants={itemVariants}
                    >
                        les infos pratiques
                    </motion.h2>
                    
                    <motion.div 
                        className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                    >
                        <motion.div 
                            className=" space-y-2 bg-primary/10 p-4 rounded-lg"
                            variants={itemVariants}
                        >
                            <h3 className="text-primary text-xl font-bold flex items-center gap-2"><Info className="mt-4" /> Prérequis : </h3>
                            <ol className="font-semibold space-y-3">
                                <li>🐬 Tu sais nager 25 m et aimer avoir la tête sous l&apos;eau; </li>
                                <li>💪 Tu es en forme (marcher, nager, grimper un peu); </li>
                                <li>📝 Posséder une assurance pour la pratique d&apos;activités sportives (responsabilité civile)</li>
                                <li>🚫 Ne pas avoir de contre-indication médicale à la pratique du canyoning ou de douleurs pouvant vous empêcher d&apos;évoluer dans le canyon et de remonter en fin d&apos;activité</li>
                                <li>😏 Les sauts restent optionnels; </li>
                            </ol>
                        </motion.div>
                        
                        <motion.div 
                            className=" space-y-2 bg-primary/10 p-4 rounded-lg"
                            variants={itemVariants}
                        >
                            <h3 className="text-primary text-xl font-bold flex items-center gap-2"><Star className="mt-4" /> Je fournis : </h3>
                            <ol className="font-semibold space-y-3">
                                <li>🧥 Combinaisons de canyon néoprène &  Chaussettes néoprène</li>
                                <li>⛑️ Casques</li>
                                <li>🎒 Sacs de canyoning & bidons étanches</li>
                                <li>💪 Du dynamisme et de la bonne humeur</li>
                                <li>👀 Un regard attentif sur la sécurité</li>
                            </ol>
                        </motion.div>
                        
                        <motion.div 
                            className=" space-y-2 bg-primary/10 p-4 rounded-lg"
                            variants={itemVariants}
                        >
                            <h3 className="text-primary text-xl font-bold flex items-center gap-2"><Users className="mt-4" /> Tu dois prévoir : </h3>
                            <ol className="font-semibold space-y-3">
                                <li>👙 Maillot de bain , serviette et crème solaire </li>
                                <li>🧦 Affaires de rechange</li>
                                <li>🥤 De l&apos;eau et un petit en-cas , pique-nique(si formule journée)</li>
                                <li>👟 Une paire de chaussures de marche ou baskets en bon état (milieu glissant et escarpé)</li>
                            </ol>
                        </motion.div>
                    </motion.div>
                </motion.article>
            </section>

          
                <CustomSection className="flex flex-col  items-center justify-center w-full bg-gray-100 py-32" 
                Markercolor="white"
                TopMarker={true}
                >
                    <h2 className="text-center ">Chaque image raconte une aventure <span className="text-secondary">!</span></h2>
                    <GalleryInsta gallery={gallery} className="lg:px-16 px-4 py-12 text-gray-100" backgroundColor="gray-100" />
                </CustomSection>
           

            <ContactSection
            
            />
        </div>
    );
};

export default CanyoningPage;