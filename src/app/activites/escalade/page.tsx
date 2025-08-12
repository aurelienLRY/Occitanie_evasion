import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg";
import { Carousel } from "@/components/ui/Carrousel";
import { ActivityFormulas, ActivitySpots } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { Info, Star, Users, Clock, MapPin, Phone, Mail } from "lucide-react";

const EscaladePage = () => {
    return (
        <section className="flex flex-col gap-16 items-center">
            <aside className="relative w-full h-full min-h-[800px] overflow-x-clip mb-16">
                <Image src="/images/escalade/Occitanie-evasion-escalade-enfant-1.webp" alt="Escalade en milieu naturel" fill className="object-cover" />
                <div className="max-w-[500px] flex flex-col gap-4 absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 text-white">
                    <h1>Escalade</h1>
                    <h2 className="!text-3xl lg:!text-4xl">Grimpe vers de nouveaux sommets !</h2>
                    <p className="text-lg">Accessible à tous à partir de 6 ans, l&apos;escalade en milieu naturel est un sport complet, tant sur le plan physique que mental.</p>
                </div>
                <MarkerLineSvg className="absolute -bottom-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
            </aside>

            {/* Description principale */}
            <article className="w-full flex flex-col gap-6 px-6 items-center">
                <div className="flex items-center justify-start w-full max-w-[80vw] min-w-[350px]">
                    <div className="max-w-[750px] flex flex-col gap-4 text-justify">
                        <h2>Défie la gravité et prends de la hauteur <span className="text-primary">!</span></h2>
                        <p>Je partagerai avec vous ma vision de la grimpe qui consiste d&apos;abord à s&apos;adapter à la nature, la comprendre et la respecter pour ensuite, en binôme, s&apos;encorder, s&apos;assurer et escalader jusqu&apos;au sommet de la voie et enfin admirer la vue incroyable avant de profiter de la descente.</p>
                        <p>Au programme : découverte du matériel spécifique et de son utilisation, apprentissage des techniques d&apos;assurage et bien sûr escalader et profiter des sensations en découvrant l&apos;activité ou en se perfectionnant.</p>
                    </div>
                </div>
                <div className="flex items-center justify-end w-full max-w-[80vw] min-w-[350px] gap-6">
                    <div className="max-w-[750px] flex flex-col gap-4 text-justify">
                        <h2><span className="text-4xl">🤔</span> Qu&apos;es aquò<span className="text-primary">?</span></h2>
                        <p>Tous les niveaux sont accessibles, du très facile au très technique (du 4 au 7ème degrés) vous devriez trouver votre bonheur.</p>
                        <p>C&apos;est grimper sur des parois rocheuses en toute sécurité ! Baudrier, cordes, mousquetons… On t&apos;équipe de A à Z. Pas besoin d&apos;être un(e) champion(ne) : on commence par les bases, on progresse ensemble, chacun à son rythme.</p>
                        <p>Accessible à partir de <strong>6 ans</strong>.</p>
                    </div>
                </div>
            </article>

            {/* Carrousel */}
            <div className="w-full flex flex-col gap-6 items-center min-h-[500px] relative">
                <div className="absolute w-[90%] min-h-[200px] bottom-19 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:h-full lg:w-1/3 lg:top-0 lg:left-0 z-50">
                    <div className="w-full h-full bg-white/30 p-4 rounded-lg flex flex-col justify-center px-12 gap-0">
                        <p className="text-white/90 font-title text-2xl font-bold">Ils l&apos;ont fait !</p>
                        <p className="text-white font-title text-6xl">Pourquoi pas toi <span className="text-primary">?</span></p>
                        <Link href="/reservation?activity=escalade" className="text-white bg-primary/80 px-4 py-2 rounded-lg w-fit mt-6 hover:bg-primary transition-all duration-300">
                            Réserver
                        </Link>
                    </div>
                </div>
                <Carousel slidesToShow={1} autoPlay={true} showDots={true} showArrows={false} showPlayPause={false} markerLineSvg={true} markerLineSvgColor="white" className="w-full h-full">
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/Occitanie-evasion-escalade-cours-enfant.webp" alt="Cours d'escalade pour enfants" fill className="object-cover" />
                    </div>
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/Occitanie-evasion-escalade-enfant-3.webp" alt="Escalade en falaise" fill className="object-cover object-top" />
                    </div>
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/Occitanie-evasion-escalade-securite.webp" alt="Sécurité en escalade" fill className="object-cover" />
                    </div>
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/Occitanie-evasion-escalade-enfant-4.webp" alt="Progression en escalade" fill className="object-cover" />
                    </div>
                    <div className="w-full h-[800px]">
                        <Image src="/images/escalade/Occitanie-evasion-escalade-degaine.webp" alt="Technique d'escalade" fill className="object-cover" />
                    </div>
                </Carousel>
            </div>

            {/* Formules */}
            <div className="w-full flex flex-col gap-6 items-center">
                <h2 className="text-center lg:text-left">Deux formules selon ton envie</h2>
                <ActivityFormulas
                    activityName="Escalade"
                    description_half="Découverte de l'escalade en milieu naturel avec apprentissage des techniques de base, découverte du matériel et premières sensations verticales. Idéal pour une première approche ou pour se perfectionner."
                    description_full="Une journée complète d'escalade pour progresser et découvrir plusieurs sites. Alternance entre apprentissage technique, pratique et découverte de nouvelles voies. Parfait pour approfondir ses compétences."
                    reducedPriceConditions="Tarif réduit pour les enfants jusqu'à 17 ans inclus et les groupes de minimum 7 personnes."
                    ACMPriceConditions="Tarif ACM : 8 enfants + 1 accompagnateur = 280€. Contactez-moi pour plus d'informations."
                />
            </div>

            {/* Spots */}
            <div className="w-full flex flex-col gap-6 px-16 items-center justify-center bg-primary py-16 relative min-h-[800px]">
                <MarkerLineSvg className="absolute -bottom-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
                <MarkerLineSvg className="absolute -top-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
                <div className="container mx-auto max-w-[1200px] space-y-16">
                    <h2 className="text-white text-6xl font-bold text-center">Où je pratique l&apos;escalade ?</h2>
                    <ActivitySpots activityName="Escalade" />
                </div>
            </div>

            {/* Matériel et prérequis */}
            <article className="container mx-auto flex flex-col gap-12 px-16">
                <h2 className="text-primary text-center lg:text-left">Les infos pratiques</h2>
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4 bg-primary/10 p-6 rounded-lg">
                        <h3 className="text-primary text-xl font-bold flex items-center gap-2">
                            <Info className="w-5 h-5" />
                            Prérequis
                        </h3>
                        <ol className="font-semibold space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">⚖️</span>
                                <span>Poids maximum : <strong>115kg</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">📝</span>
                                <span>Posséder une assurance pour la pratique d&apos;activités sportives (responsabilité civile)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">🚫</span>
                                <span>Ne pas avoir de contre-indication médicale à la pratique de l&apos;escalade</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">🎯</span>
                                <span>Être motivé et avoir envie de découvrir l&apos;escalade</span>
                            </li>
                        </ol>
                    </div>
                    
                    <div className="space-y-4 bg-primary/10 p-6 rounded-lg">
                        <h3 className="text-primary text-xl font-bold flex items-center gap-2">
                            <Star className="w-5 h-5" />
                            Je fournis
                        </h3>
                        <ul className="font-semibold space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">⛑️</span>
                                <span>Casques</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">👟</span>
                                <span>Baudriers & chaussons</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">🪢</span>
                                <span>Cordes & équipements de sécurité</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">🔒</span>
                                <span>Système d&apos;assurage</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">💪</span>
                                <span>Du dynamisme et de la bonne humeur</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">👀</span>
                                <span>Un regard attentif sur la sécurité</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="space-y-4 bg-primary/10 p-6 rounded-lg">
                        <h3 className="text-primary text-xl font-bold flex items-start gap-2">
                            <Users className="w-5 h-5 mt-1" />
                            Tu dois prévoir
                        </h3>
                        <ul className="font-semibold space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">👟</span>
                                <span>Chaussures baskets ou randonnée</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">👕</span>
                                <span>Tenue sport adaptée</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">🥤</span>
                                <span>Eau / Encas</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">👩‍🦱</span>
                                <span>Élastique à cheveux</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">☀️</span>
                                <span>Crème solaire</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">👓</span>
                                <span>Cordon à lunette</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default EscaladePage;