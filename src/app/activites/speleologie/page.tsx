"use client"
import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg";
import { Carousel } from "@/components/ui/Carrousel";
import { ActivityFormulas, ActivitySpots } from "@/components/ui";
import Image from "next/image";
import { Info, Star, Users, Gift } from "lucide-react";
import ReservationLink from "@/components/ui/ReservationLink";
import { GalleryInsta } from "@/components/ui/gallery";
import { GalleryInstaArray } from "@/components/ui/gallery/galleryInsta";
import CustomSection from "@/components/layout/Section";
import ContactSection from "../../(section-page)/contact-section";

const SpeleoPage = () => {
    const gallery: GalleryInstaArray = [
        { url: "/images/speleologie/speleo_1.webp", alt: "Spéléologie" },
        { url: "/images/speleologie/speleo_2.webp", alt: "Exploration souterraine" },
        { url: "/images/speleologie/speleo_3.webp", alt: "spéléologie anniversaire" },
        { url: "/images/speleologie/speleo_4.webp", alt: "Grotte et stalactites" },
        { url: "/images/speleologie/speleo_5.webp", alt: "Grotte et stalactites" },
        { url: "/images/speleologie/speleo_6.webp", alt: "Spéléoniversaire , groupe d'enfant dans une grotte qui fête un anniversaire" },

    ];

    return (
        <div className="flex flex-col gap-16 overflow-x-clip">
            <section className="flex flex-col gap-8 items-center">
                <aside className="relative w-full h-full min-h-[800px] overflow-x-clip mb-16">
                    <Image src="/images/speleologie/speleo_6.webp" alt="Spéléologie" fill className="object-cover" />
                    <div className="max-w-[500px] w-90% min-w-[350px]  flex flex-col gap-4 absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 text-white  px-6 py-2 rounded-lg bg-black/20">
                        <h1>Spéléologie</h1>
                        <h2 className="!text-3xl lg:!text-4xl">Explore un monde souterrain incroyable !</h2>
                        <p className="text-lg">Découvre les merveilles que la nature a façonnées durant des millions d&apos;années dans un milieu majestueux et fragile.</p>
                    </div>
                    <MarkerLineSvg className="absolute -bottom-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
                </aside>

                {/* description */}
                <article className="container mx-auto space-y-16 px-6">
                    <div className="flex items-center justify-start w-full max-w-[80vw] min-w-[350px]">
                        <div className="space-y-4 max-w-[850px] text-justify">
                                                    <h2>Plonge dans l&apos;univers mystérieux des grottes <span className="text-primary">!</span></h2>
                        <p>Je t&apos;invite à la découverte d&apos;un monde souterrain incroyable que la nature a façonné durant des millions d&apos;années. Un milieu souvent méconnu, majestueux et extrêmement fragile à la fois.</p>
                        <p>Viens vivre une expérience hors du temps, en symbiose avec la formation des roches, la création des grottes, l&apos;apparition des concrétions (stalactites, stalagmites, draperies…).</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-end w-full max-w-[80vw] min-w-[350px]">
                        <div className="space-y-4 max-w-[850px] text-justify">
                                                    <h2>Spéléologie,<span className="text-4xl">🤔</span> qu&apos;es aquò<span className="text-primary">?</span></h2>
                        <p>Je t&apos;accompagnerai au cœur de ce milieu magique, afin de le comprendre, de l&apos;admirer et de le respecter. Équipé d&apos;un casque avec éclairage, d&apos;une combinaison, d&apos;un baudrier (selon les cavités), partons ensemble à la découverte de ce monde caché.</p>
                        <p>La sélection des cavités que je te propose est adaptée à tes différentes envies. <strong>Pas besoin d&apos;être un(e) explorateur(trice) : on découvre ensemble, chacun à son rythme.</strong></p>
                        </div>
                    </div>
                </article>

                {/* carrousel */}
                <div className="w-full flex flex-col gap-6 items-center min-h-[500px] relative">
                    <div className="absolute w-[90%] min-h-[200px] bottom-19 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:h-full lg:w-1/3 lg:top-0 lg:left-0 z-50">
                        <div className="w-full h-full bg-white/30 p-4 rounded-lg flex flex-col justify-center px-12 gap-0">
                            <p className="text-white/90 py-4 font-title text-2xl lg:text-4xl font-bold">Ils l&apos;ont fait !</p>
                            <p className="text-white font-title text-4xl lg:text-6xl">Pourquoi pas toi <span className="text-primary">?</span></p>
                            <ReservationLink activity="speleologie" className="text-white bg-primary/80 px-4 py-2 rounded-lg w-fit mt-6 hover:bg-primary transition-all duration-300">
                                Réserver
                            </ReservationLink>
                        </div>
                    </div>
                    <Carousel slidesToShow={1} autoPlay={true} showDots={true} showArrows={false} showPlayPause={false} markerLineSvg={true} markerLineSvgColor="white" className="w-full h-full">
                        <div className="w-full h-[800px]">
                            <Image src="/images/speleologie/speleo_1.webp" alt="Spéléologie" fill className="object-cover" />
                        </div>
                        <div className="w-full h-[800px]">
                            <Image src="/images/speleologie/speleo_2.webp" alt="Exploration souterraine" fill className="object-cover" />
                        </div>
                        <div className="w-full h-[800px]">
                            <Image src="/images/speleologie/speleo_3.webp" alt="Grotte et stalactites" fill className="object-cover" />
                        </div>
                    </Carousel>
                </div>

                <div className="w-full flex flex-col gap-6  items-center relative pb-16">
                    <h2 className="text-center lg:text-left">Trois formules selon ton envie</h2>
                    <ActivityFormulas
                        activityName="Speleologie"
                        description_half="Grotte d&apos;initiation avec un parcours adapté aux familles et aux personnes souhaitant s&apos;initier en détente. Parcours accessible aux enfants dès 6 ans, idéal pour une première approche de la spéléologie."
                        description_full="Parcours plus sportif avec présence de descentes en rappel et mains courantes. Une traversée qui consiste, au lieu de faire un aller-retour, à entrer d&apos;un côté et ressortir ailleurs. Pour les plus aventuriers !"
                        reducedPriceConditions="Tarif réduit pour les enfants jusqu&apos;à 17 ans inclus et les groupes de minimum 5 personnes."
                        ACMPriceConditions="Tarif ACM : 5 enfants + 1 accompagnateur = 220€. Contactez-moi pour plus d&apos;informations."
                    />

                     {/* Spéléoniversaire */}
                <article className="container mx-auto flex flex-col gap-12 px-4">
                    <div className="w-full bg-gradient-to-r from-primary/20 to-primary/10 p-8 rounded-lg border-l-4 border-primary">
                        <div className="flex items-start gap-4">
                            <Gift className="w-32 h-32 text-primary mt-1" />
                            <div className="space-y-4">
                                <h2 className="text-primary text-3xl font-bold">Spéléoniversaire : un anniversaire inoubliable sous terre !</h2>
                                <p className="text-lg">Offre à ton enfant une aventure unique pour son anniversaire : une exploration souterraine ludique et magique au cœur d&apos;une véritable grotte !</p>
                                <p>Équipés comme de vrais petits spéléologues (casque avec éclairage, combinaison), les enfants partent à la découverte d&apos;un monde mystérieux, entre stalactites, passages secrets et recoins fascinants. Mais attention, l&apos;exploration ne se fait pas sans surprises ! En chemin, ils devront relever des défis, résoudre des énigmes, et participer à des jeux d&apos;équipe pour percer les secrets de la cavité.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                    <div className="text-center">
                                        <p className="font-bold text-primary">Durée</p>
                                        <p>2h30 / 3h</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-primary">Âge</p>
                                        <p>À partir de 6 ans</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-primary">Tarif</p>
                                        <p>200€</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-4">*Thème personnalisable : thème, surprises, petits cadeaux…</p>
                            </div>
                        </div>
                    </div>
                </article>
                </div>

                <div className="w-full flex flex-col gap-6 px-16 items-center bg-primary py-16 relative min-h-[800px]">
                    <MarkerLineSvg className="absolute -bottom-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
                    <MarkerLineSvg className="absolute -top-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180" preserveAspectRatio="none" />
                    <div className="container mx-auto max-w-[1200px] space-y-16">
                        <h2 className="text-white text-6xl font-bold text-center">Où je pratique la spéléologie ?</h2>
                        <ActivitySpots activityName="Speleologie" />
                    </div>
                </div>

               

                {/* Infos pratiques */}
                <article className="container mx-auto flex flex-col gap-12 px-16">
                    <h2 className="text-center">Les infos pratiques</h2>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-2 bg-primary/10 p-4 rounded-lg">
                            <h3 className="text-primary text-xl font-bold flex items-center gap-2">
                                <Info className="mt-4" /> Prérequis
                            </h3>
                            <ol className="font-semibold space-y-3">
                                <li>⚖️ Poids maximum : <strong>115kg</strong></li>
                                <li>💪 Être en forme physique générale</li>
                                <li>🚫 Pas de claustrophobie</li>
                                <li>🌑 Aimer l&apos;obscurité et les espaces confinés</li>
                                <li>📝 Posséder une assurance pour la pratique d&apos;activités sportives</li>
                                <li>🎯 Activité accessible dès <strong>6 ans</strong></li>
                            </ol>
                        </div>
                        <div className="space-y-2 bg-primary/10 p-4 rounded-lg">
                            <h3 className="text-primary text-xl font-bold flex items-center gap-2">
                                <Star className="mt-4" /> Je fournis
                            </h3>
                            <ol className="font-semibold space-y-3">
                                <li>⛑️ Casque avec éclairage</li>
                                <li>🧥 Combinaison</li>
                                <li>🪢 Baudrier, descendeur, longes, mousquetons (selon cavité)</li>
                                <li>🎒 Sac à dos</li>
                                <li>💪 Du dynamisme et de la bonne humeur</li>
                                <li>👀 Un regard attentif sur la sécurité</li>
                            </ol>
                        </div>
                        <div className="space-y-2 bg-primary/10 p-4 rounded-lg">
                            <h3 className="text-primary text-xl font-bold flex items-center gap-2">
                                <Users className="mt-4" /> Tu dois prévoir
                            </h3>
                            <ol className="font-semibold space-y-3">
                                <li>👕 Tenue de sport (pantalon et haut manche longue style polaire)</li>
                                <li>👟 Chaussures de marche ou baskets en bon état</li>
                                <li>🥤 Eau et encas</li>
                                <li>👩‍🦱 Élastique à cheveux</li>
                                <li>👕 Affaires de rechange</li>
                                <li>📱 Pas de téléphone (milieu humide)</li>
                            </ol>
                        </div>
                    </div>
                </article>
            </section>

            <CustomSection className="flex flex-col items-center justify-center w-full bg-gray-100 py-16" 
                Markercolor="white"
                TopMarker={true}
            >
                <h2 className="text-center">Des photos de ton exploration souterraine ?</h2>
                <GalleryInsta gallery={gallery} className="px-16 py-12" backgroundColor="gray-100" />
            </CustomSection>

            <ContactSection />
        </div>
    );
};

export default SpeleoPage;