"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { easeOut, motion, useInView } from "framer-motion";
import { MapPin, Clock, Droplets, Shield, ChevronRight } from "lucide-react";
import { MarkerLineSvg } from "@/components/ui/svg/MarkerLine.svg";
import { Carousel } from "@/components/ui/Carrousel";
import { ActivityFormulas } from "@/components/ui";
import ReservationLink from "@/components/ui/ReservationLink";
import { GalleryInsta } from "@/components/ui/gallery";
import { GalleryInstaArray } from "@/components/ui/gallery/galleryInsta";
import CustomSection from "@/components/layout/Section";
import ContactSection from "../(section-page)/contact-section";

const gallery: GalleryInstaArray = [
  { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_27.webp", alt: "Vue des gorges du Banquet depuis le canyon" },
  { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_13.webp", alt: "Gorges du Banquet - canyon de l'Arn" },
  { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_19.webp", alt: "Cascade dans les gorges du Banquet" },
  { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_8.webp", alt: "Glissade en canyoning au Banquet" },
  { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_22.webp", alt: "Saut en canyoning dans le Tarn" },
  { url: "/images/Canyoning/gallery/canyoning_occitanie-evasion_18.webp", alt: "Toboggan naturel gorges du Banquet" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const leftBlockVariants = {
  hidden: { opacity: 0, x: -40, y: 16 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

const rightBlockVariants = {
  hidden: { opacity: 0, x: 40, y: 16 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

export default function RandonneeAquatiquePageClient() {
  const introRef = useRef(null);
  const parcoursRef = useRef(null);
  const pratiqueRef = useRef(null);
  const formulasRef = useRef(null);

  const introInView = useInView(introRef, { once: true, margin: "-80px" });
  const parcoursInView = useInView(parcoursRef, { once: true, margin: "-80px" });
  const pratiqueInView = useInView(pratiqueRef, { once: true, margin: "-80px" });
  const formulasInView = useInView(formulasRef, { once: true, margin: "-80px" });

  return (
    <div className="flex flex-col gap-16 overflow-x-clip">
      <section className="flex flex-col gap-8 items-center">
        <aside className="relative w-full min-h-[720px] lg:min-h-[800px] overflow-x-clip mb-16">
          <Image
            src="/images/Canyoning/canyoning-hero.webp"
            alt="Randonnee aquatique et canyoning dans les gorges du Banquet, Mazamet, Tarn"
            fill
            className="object-cover hidden md:block"
            priority
          />
          <Image
            src="/images/Canyoning/canyoning-hero-mobile.webp"
            alt="Canyoning gorges du Banquet pres de Mazamet"
            fill
            className="object-cover md:hidden"
            priority
          />
          <div className="max-w-[640px] w-[95%] flex flex-col gap-3 absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 text-white px-6 py-4 rounded-lg bg-black/25">
            <nav aria-label="Fil d'Ariane" className="text-sm text-white/80 font-paragraphe">
              <Link href="/" className="hover:text-secondary transition-colors">
                Accueil
              </Link>
              {" / "}
              <Link href="/activites/canyoning" className="hover:text-secondary transition-colors">
                Canyoning
              </Link>
              {" / "}
              <span className="text-white">Banquet</span>
            </nav>
            <h1>Randonnee aquatique a Mazamet</h1>
            <h2 className="!text-3xl lg:!text-4xl">
              Canyoning dans les <span className="text-secondary">gorges du Banquet</span>
            </h2>
            <p className="!text-lg font-paragraphe">
              A 10 minutes de Mazamet, descendez le canyon de l&apos;Arn dans le Tarn : eau vive,
              granit et nature sauvage du Parc naturel regional du Haut-Languedoc.
            </p>
            <ReservationLink
              activity="canyoning"
              lieux="banquet"
              className="text-white bg-primary/90 px-5 py-2.5 rounded-lg w-fit mt-2 hover:bg-primary transition-all duration-300 font-semibold"
            >
              Reserver au Banquet
            </ReservationLink>
          </div>
          <MarkerLineSvg
            className="absolute -bottom-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white rotate-180"
            preserveAspectRatio="none"
          />
        </aside>

        <motion.article
          ref={introRef}
          className="container mx-auto space-y-16 px-6 max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate={introInView ? "visible" : "hidden"}
        >
          <motion.div variants={leftBlockVariants}>
            <h2>
              Les gorges du Banquet, spot incontournable du <span className="text-primary">Tarn</span>
            </h2>
            <div className="space-y-4 max-w-[850px] text-justify mt-6 font-paragraphe text-lg">
              <p>
                A quelques kilometres a l&apos;est de <strong>Mazamet</strong>, le village de{" "}
                <strong>Saint-Amans-Valtoret</strong> (81240) abrite l&apos;une des plus belles
                descentes de canyon du departement : les <strong>gorges du Banquet</strong>. Sculptees
                dans le granit par la riviere de l&apos;<strong>Arn</strong>, ces gorges encaissees
                offrent un decor mineral spectaculaire, entre parois verticales, vasques turquoise et
                cascades.
              </p>
              <p>
                Class{'\u00e9'}es au coeur du <strong>Parc naturel regional du Haut-Languedoc</strong>, elles
                attirent les amateurs de <strong>randonnee aquatique</strong> et de{" "}
                <strong>canyoning a Mazamet</strong> des le printemps, lorsque le debit de l&apos;eau
                permet une descente ludique et rafraichissante e de mai a septembre en generale.
              </p>
              <p>
                Propriete privee, le site est accessible uniquement avec un{" "}
                <strong>guide diplome</strong>. Avec <strong>Occitanie Evasion</strong>, Florent Soum
                vous accompagne en toute securite pour vivre cette aventure en eau vive, que vous
                la decouvriez en demi-journee ou sur la journee complete.
              </p>
            </div>
          </motion.div>

          <motion.div variants={rightBlockVariants} className="flex justify-end">
            <div className="space-y-4 max-w-[850px] text-justify font-paragraphe text-lg">
              <h2>
                Randonnee aquatique ou canyoning :<span className="text-primary"> quelle difference ?</span>
              </h2>
              <p>
                Sur le terrain, c&apos;est la meme experience : une progression dans le cours d&apos;eau,
                en combinaison neoprene et casque. On marche, on nage, on glisse sur des toboggans
                naturels et on franchit les obstacles aux cotes de son moniteur.
              </p>
              <p>
                Le terme <strong>randonnee aquatique</strong> est souvent recherche par les familles
                et les debutants autour de <strong>Mazamet</strong> ; le mot <strong>canyoning</strong>{" "}
                evoque davantage les sensations fortes. Au Banquet, les deux se rejoignent : parcours
                accessible des <strong>10 ans</strong>, sauts toujours <strong>optionnels</strong>, et
                ambiance conviviale.
              </p>
              <p>
                <Link href="/activites/canyoning" className="text-secondary font-semibold hover:underline">
                  Voir la page canyoning Occitanie Evasion
                </Link>{" "}
                pour l&apos;ensemble des informations sur l&apos;activite.
              </p>
            </div>
          </motion.div>
        </motion.article>

        <motion.article
          ref={parcoursRef}
          className="w-full bg-primary py-16 px-6 relative"
          variants={itemVariants}
          initial="hidden"
          animate={parcoursInView ? "visible" : "hidden"}
        >
          <MarkerLineSvg
            className="absolute -top-13 left-1/2 -translate-x-1/2 w-[135vw] h-24 text-white"
            preserveAspectRatio="none"
          />
          <div className="container mx-auto max-w-5xl text-white space-y-8">
            <h2 className="text-center text-white">
              Que vivre dans le canyon du <span className="text-secondary">Banquet</span> ?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 font-paragraphe text-lg">
              <div className="space-y-4">
                <h3 className="!text-2xl text-secondary">Partie haute e demi-journee</h3>
                <p>
                  La portion amont des gorges concentre les passages les plus encaisses : enchainement
                  de <strong>sauts jusqu&apos;a 6 ou 7 metres</strong> (contournables),{" "}
                  <strong>toboggans naturels</strong>, nages dans les vasques et marche le long des
                  parois de granit. Comptez environ <strong>3 heures</strong> d&apos;activite, equipement
                  compris.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="!text-2xl text-secondary">Integral e journee</h3>
                <p>
                  La formule journee permet de descendre <strong>l&apos;integralite des gorges du Banquet</strong>{" "}
                  : matinee dynamique dans le haut du canyon, pause pique-nique sur les rochers, puis
                  apres-midi tres ludique avec toboggans a refaire, baignades et final memorable. Environ{" "}
                  <strong>5 heures</strong> sur le terrain.
                </p>
              </div>
            </div>
            <ul className="grid sm:grid-cols-3 gap-4 pt-4">
              {[
                { icon: Droplets, label: "Eau vive de l'Arn", text: "Rafraichissement garanti en ete" },
                { icon: Shield, label: "Encadrement pro", text: "BPJEPS, materiel aux normes" },
                { icon: MapPin, label: "10 min de Mazamet", text: "RDV au Banquet, 81240" },
              ].map(({ icon: Icon, label, text }) => (
                <li
                  key={label}
                  className="bg-white/10 rounded-lg p-4 flex flex-col gap-2"
                >
                  <Icon className="w-8 h-8 text-secondary" aria-hidden />
                  <strong>{label}</strong>
                  <span className="text-white/90 text-base">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        <motion.div
          className="w-full flex flex-col gap-6 items-center min-h-[480px] relative px-4"
          variants={itemVariants}
          initial="hidden"
          animate={parcoursInView ? "visible" : "hidden"}
        >
          <div className="absolute w-[90%] min-h-[180px] bottom-16 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:h-full lg:w-1/3 lg:top-0 lg:left-4 z-50">
            <div className="w-full h-full bg-white/30 p-4 rounded-lg flex flex-col justify-center px-8 gap-2">
              <p className="text-white/90 font-title text-2xl lg:text-3xl font-bold">
                Pret pour l&apos;aventure ?
              </p>
              <p className="text-white font-title text-3xl lg:text-5xl">
                Le Banquet vous attend <span className="text-primary">!</span>
              </p>
              <ReservationLink
                activity="canyoning"
                lieux="banquet"
                className="text-white bg-primary/80 px-4 py-2 rounded-lg w-fit mt-4 hover:bg-primary transition-all"
              >
                Reserver
              </ReservationLink>
            </div>
          </div>
          <Carousel
            slidesToShow={1}
            autoPlay
            showDots
            showArrows={false}
            showPlayPause={false}
            markerLineSvg
            markerLineSvgColor="white"
            className="w-full h-full"
          >
            <div className="w-full h-[600px] lg:h-[700px] relative">
              <Image
                src="/images/Canyoning/carrousel/canyoning_occitanie-evasion_1920_9.webp"
                alt="Canyoning dans les gorges du Banquet, Mazamet"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full h-[600px] lg:h-[700px] relative">
              <Image
                src="/images/Canyoning/carrousel/canyoning_occitanie-evasion_1920_21.webp"
                alt="Toboggan naturel canyon du Banquet Tarn"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full h-[600px] lg:h-[700px] relative">
              <Image
                src="/images/Canyoning/carrousel/canyoning_occitanie-evasion_1920_31.webp"
                alt="Randonnee aquatique gorges du Banquet"
                fill
                className="object-cover"
              />
            </div>
          </Carousel>
        </motion.div>

        <motion.article
          ref={pratiqueRef}
          className="container mx-auto px-6 max-w-5xl space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate={pratiqueInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <h2>
              Qui peut faire une randonnee aquatique au <span className="text-primary">Banquet</span> ?
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 mt-6 font-paragraphe text-lg">
              <div className="space-y-3">
                <p>
                  <strong>A partir de 10 ans</strong> en formule decouverte, avec un adulte responsable
                  pour les mineurs. Savoir <strong>nager 25 metres</strong> et accepter de passer la tete
                  sous l&apos;eau sont indispensables.
                </p>
                <p>
                  Une condition physique correcte est necessaire : marche sur terrain pentu et rocheux,
                  quelques passages ou il faut se hisser. Poids maximum : <strong>115 kg</strong>.
                </p>
                <p>
                  Les sauts restent <strong>facultatifs</strong> : le guide propose des contournements
                  pour progresser a son rythme.
                </p>
              </div>
              <div className="bg-primary/10 rounded-xl p-6 space-y-4">
                <h3 className="!text-xl text-primary flex items-center gap-2">
                  <Clock className="w-5 h-5" aria-hidden />
                  Infos pratiques Mazamet / Banquet
                </h3>
                <ul className="space-y-2 font-semibold">
                  <li>
                    <strong>Saison :</strong> mai a septembre (selon meteo et debit)
                  </li>
                  <li>
                    <strong>Rendez-vous :</strong> Le Banquet, 81240 Saint-Amans-Valtoret
                  </li>
                  <li>
                    <strong>Horaires :</strong> 10h (matin) / 14h30 (apres-midi demi-journee) / 10h30
                    (journee)
                  </li>
                  <li>
                    <strong>Equipement fourni :</strong> combinaison, casque, sac etanche
                  </li>
                  <li>
                    <strong>A prevoir :</strong> maillot, chaussures de marche, eau, crene solaire
                  </li>
                </ul>
                <p className="text-sm">
                  Consultez nos{" "}
                  <Link href="/cgv" className="text-secondary hover:underline">
                    conditions generales de vente
                  </Link>{" "}
                  et la{" "}
                  <Link href="/faq" className="text-secondary hover:underline">
                    FAQ
                  </Link>{" "}
                  pour l&apos;annulation et l&apos;assurance.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-secondary/10 rounded-xl p-8 border-l-4 border-secondary">
            <h2 className="!text-3xl">
              Pourquoi descendre le Banquet avec <span className="text-secondary">Occitanie Evasion</span> ?
            </h2>
            <p className="mt-4 font-paragraphe text-lg text-justify">
              Florent Soum, <strong>moniteur diplome d&apos;Etat</strong> (BPJEPS CKDA, CS Escalade,
              BAPAAT Speleologie), connait intimement ce canyon. Il adapte le rythme du groupe, veille
              a la securite a chaque obstacle et partage sa passion du territoire mazametain. Materiel
              professionnel, petits groupes, pedagogue et bonne humeur : autant de raisons de confier
              votre <strong>randonnee aquatique dans le Tarn</strong> a une structure locale, basee a La
              Redorte et active sur Mazamet, l&apos;Aude et l&apos;Herault.
            </p>
            <Link
              href="/reservation?activity=canyoning&lieux=banquet"
              className="inline-flex items-center gap-2 mt-6 text-primary font-bold hover:text-secondary transition-colors"
            >
              Choisir une date au Banquet
              <ChevronRight className="w-5 h-5" aria-hidden />
            </Link>
          </motion.div>
        </motion.article>

        <motion.div
          ref={formulasRef}
          className="w-full flex flex-col gap-6 items-center px-4"
          variants={itemVariants}
          initial="hidden"
          animate={formulasInView ? "visible" : "hidden"}
        >
          <h2 className="text-center">
            Formules canyoning <span className="text-primary">gorges du Banquet</span>
          </h2>
          <p className="text-center max-w-2xl font-paragraphe text-lg px-4">
            Demi-journee ou journee complete au depart de Mazamet e tarifs 2025 sur la page canyoning.
          </p>
          <ActivityFormulas
            activityName="Canyoning"
            description_half="Partie haute du canyon du Banquet : sauts (jusqu'a 6/7 m), nages, cascades et toboggans dans la section la plus encaissee des gorges. Environ 3 h d'aventure au coeur du Tarn."
            description_full="Descente integrale des gorges du Banquet : matinee technique et ludique, pause pique-nique, apres-midi toboggans et vasques. Une journee complete pour decouvrir tout le canyon de l'Arn."
            reducedPriceConditions="Tarif reduit enfants jusqu'a 17 ans et groupes de 7 personnes minimum."
            ACMPriceConditions="Tarif ACM : 8 enfants + 1 animateur = 280 EUR. Me contacter pour les disponibilites."
          />
        </motion.div>

        <CustomSection
          className="flex flex-col items-center justify-center w-full bg-gray-100 py-24"
          Markercolor="white"
          TopMarker
        >
          <h2 className="text-center px-4">
            Le Banquet en images <span className="text-secondary">!</span>
          </h2>
          <p className="text-center max-w-xl px-4 mt-2 font-paragraphe text-gray-700">
            Quelques souvenirs de descentes dans les gorges, entre Mazamet et Saint-Amans-Valtoret.
          </p>
          <GalleryInsta
            gallery={gallery}
            className="lg:px-16 px-4 py-12"
            backgroundColor="gray-100"
          />
        </CustomSection>
      </section>

      <ContactSection />
    </div>
  );
}
