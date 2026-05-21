"use client"
import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg";
import { Carousel } from "@/components/ui/Carrousel";
import { ActivityFormulas, ActivitySpots } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { Info, Star, Users } from "lucide-react";
import CustomSection from "@/components/layout/Section";
import { GalleryInsta } from "@/components/ui/gallery";
import ContactSection from "@/app/(section-page)/contact-section";
import { GalleryInstaArray } from "@/components/ui/gallery/galleryInsta";
import { easeOut, motion, useInView } from "framer-motion";
import { useRef } from "react";



const EscaladePage = () => {
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
        { url: "/images/escalade/gallery/Occitanie-evasion-escalade-enfant-1.webp", alt: "Escalade" },
        { url: "/images/escalade/gallery/Occitanie-evasion-escalade-degaine.webp", alt: "Escalade" },
        { url: "/images/escalade/gallery/Occitanie-evasion-escalade-enfant-2.webp", alt: "Escalade" },
        { url: "/images/escalade/gallery/Occitanie-evasion-escalade-groupe.webp", alt: "Escalade" },
        { url: "/images/escalade/gallery/Occitanie-evasion-escalade-enfant-4.webp", alt: "Escalade" },
        { url: "/images/escalade/gallery/Occitanie-evasion-escalade-securite.webp", alt: "Escalade" },
        { url: "/images/escalade/gallery/Occitanie-evasion-escalade-cours-enfant.webp", alt: "Escalade" },
        { url: "/images/escalade/gallery/Occitanie-evasion-escalade-groupe-2.webp", alt: "Escalade" },
        { url: "/images/escalade/gallery/Occitanie-evasion-escalade-enfant-3.webp", alt: "Escalade" },
    ];


    return (
        <div className="flex flex-col gap-16 overflow-x-clip">
        <section className="flex flex-col gap-16 items-center">
            <aside className="relative w-full h-full min-h-[800px] overflow-x-clip mb-16">²
                <Image src="/images/escalade/Occitanie-evasion-escalade-Hero.webp" alt="Escalade en milieu naturel" fill className="object-cover" />
                <div className="max-w-[600px] w-[95%]  flex flex-col gap-4 absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 text-white px-6 py-2 rounded-lg bg-black/20">
                    <h1>Escalade en Occitanie</h1>
                    <h2 className="!text-3xl lg:!text-4xl">Grimpez sur les plus belles falaises de l&apos;Aude et de l&apos;Hérault !</h2>
                    <p className="text-lg">Accessible à tous dès 6 ans, l&apos;escalade en milieu naturel est un sport complet alliant physique et mental au cœur de la nature.</p>
                </div>
                <MarkerLineSvg className="absolute -bottom-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
            </aside>

            {/* Description principale */}
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
                        <h2>Défie la gravité et prends de la hauteur <span className="text-primary">!</span></h2>
                        <p>Je partagerai avec vous ma vision de la grimpe qui consiste d&apos;abord à s&apos;adapter à la nature, la comprendre et la respecter pour ensuite, en binôme, s&apos;encorder, s&apos;assurer et escalader jusqu&apos;au sommet de la voie et enfin admirer la vue incroyable avant de profiter de la descente.</p>
                        <p>Au programme : découverte du matériel spécifique et de son utilisation, apprentissage des techniques d&apos;assurage et bien sûr escalader et profiter des sensations en découvrant l&apos;activité ou en se perfectionnant.</p>
                    </div>
                </motion.div>
                
                <motion.div 
                    className="flex items-center justify-end w-full max-w-[80vw] "
                    variants={rightBlockVariants}
                >
                    <div className="space-y-4 max-w-[850px] text-justify">
                        <h2><span className="text-4xl">🤔</span> Qu&apos;es aquò<span className="text-primary">?</span></h2>
                        <p>Tous les niveaux sont accessibles, du très facile au très technique (du 4 au 7ème degrés) vous devriez trouver votre bonheur.</p>
                        <p>C&apos;est grimper sur des parois rocheuses en toute sécurité ! Baudrier, cordes, mousquetons… On t&apos;équipe de A à Z. On commence par les bases, on progresse ensemble, chacun à son rythme.</p>
                        <p>Accessible à partir de <strong>6 ans</strong>.</p>
                    </div>
                </motion.div>
            </motion.article>

            {/* Carrousel */}
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
                        <Link href="/reservation?activity=escalade" className="text-white  bg-primary/80 px-4 py-2 rounded-lg w-fit mt-6 hover:bg-primary transition-all duration-300">
                            Réserver
                        </Link>
                    </div>
                </motion.div>
                <Carousel slidesToShow={1} autoPlay={true} showDots={true} showArrows={false} showPlayPause={false} markerLineSvg={true} markerLineSvgColor="white" className="w-full h-full">
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/carrousel/Occitanie-evasion-escalade-cours-enfant.webp" alt="Cours d'escalade pour enfants" fill className="object-cover" />
                    </div>
            
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/carrousel/Occitanie-evasion-escalade-securite.webp" alt="Sécurité en escalade" fill className="object-cover" />
                    </div>
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/carrousel/Occitanie-evasion-escalade-enfant-4.webp" alt="Progression en escalade" fill className="object-cover" />
                    </div>
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/carrousel/speleologie_occitanie-evasion_1920_11.webp" alt="Technique d'escalade" fill className="object-cover" />
                    </div>
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/carrousel/speleologie_occitanie-evasion_1920_16.webp" alt="Technique d'escalade" fill className="object-cover" />
                    </div>
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/carrousel/speleologie_occitanie-evasion_1920_14.webp" alt="Technique d'escalade" fill className="object-cover" />
                    </div>
                </Carousel>
            </motion.div>

            {/* Formules */}
            <motion.div 
                ref={formulasRef}
                className="w-full flex flex-col gap-6  items-center"
                variants={itemVariants}
                initial="hidden"
                animate={formulasInView ? "visible" : "hidden"}
            >
                <h2 className="text-center lg:text-left">Deux formules selon ton envie</h2>
                <ActivityFormulas
                    activityName="Escalade"
                    description_half="Découverte de l'escalade en milieu naturel avec apprentissage des techniques de base, découverte du matériel et premières sensations verticales. Idéal pour une première approche ou pour se perfectionner."
                    description_full="Une journée complète d'escalade pour progresser et découvrir plusieurs secteurs. Alternance entre apprentissage technique, pratique et découverte de nouvelles voies. Parfait pour approfondir ses compétences."
                    reducedPriceConditions="Tarif réduit pour les enfants jusqu'à 17 ans inclus et les groupes de minimum 7 personnes."
                    ACMPriceConditions="Tarif ACM : 8 enfants + 1 accompagnateur = 280€. Contactez-moi pour plus d'informations."
                />
            </motion.div>

            {/* Spots */}
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
                    <h2 className="text-white text-6xl font-bold text-center ">Où je pratique l&apos;escalade ?</h2>
                    <ActivitySpots activityName="Escalade" />
                </div>
            </motion.div>

            {/* Matériel et prérequis */}
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
                            <li>⚖️ Poids maximum : <strong>115kg</strong> </li>
                            <li>📝 Posséder une assurance pour la pratique d&apos;activités sportives (responsabilité civile)</li>
                            <li>🚫 Ne pas avoir de contre-indication médicale à la pratique de l&apos;escalade</li>
                            <li>🎯 Être motivé et avoir envie de découvrir l&apos;escalade</li>
                        </ol>
                    </motion.div>
                    
                    <motion.div 
                        className=" space-y-2 bg-primary/10 p-4 rounded-lg"
                        variants={itemVariants}
                    >
                        <h3 className="text-primary text-xl font-bold flex items-center gap-2"><Star className="mt-4" /> Je fournis : </h3>
                        <ol className="font-semibold space-y-3">
                            <li>⛑️ Casques</li>
                            <li>👟 Baudriers & chaussons</li>
                            <li>🪢 Cordes & équipements de sécurité</li>
                            <li>🔒 Système d&apos;assurage</li>
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
                            <li>👟 Chaussures baskets ou randonnée </li>
                            <li>👕 Tenue sport adaptée</li>
                            <li>🥤 Eau / Encas</li>
                            <li>👩‍🦱 Élastique à cheveux</li>
                            <li>☀️ Crème solaire</li>
                            <li>👓 Cordon à lunette</li>
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
        <ContactSection />
        </div>
    );
};

export default EscaladePage;