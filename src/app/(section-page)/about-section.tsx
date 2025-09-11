import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const AboutSection = ( { className }: { className?: string } ) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Variantes d'animation pour les éléments
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
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -5 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const backgroundImageVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: 5, x: -20 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            x: 0,
            transition: {
                duration: 0.8,
                delay: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <section ref={ref} className={`flex flex-col-reverse lg:flex-row  lg:gap-6  w-full py-12   overflow-hidden ${className}`}>
            <motion.div 
                className="flex flex-col max-w-4xl"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.h2 
                    variants={itemVariants}
                    className="!text-6xl lg:!text-8xl text-center lg:text-start"
                >
                    Qui suis-je<span className="text-secondary">?</span>
                </motion.h2>

                <motion.p 
                    variants={itemVariants}
                    className=" text-justify mt-4"
                >
                    Je m&apos;appelle <span className="font-bold">Florent Soum </span>, et j&apos;ai la chance d&apos;exercer un métier qui me passionne depuis plus de 15 ans : <wbr />
                    <strong> accompagner petits et grands dans l&apos;exploration de la nature</strong> à travers des activités riches en émotions et en découvertes. <br />
                    <strong className=""> <span className="text-xl">🌿</span>Canyoning, escalade, spéléologie, via corda… </strong>autant de façons de se reconnecter à soi, aux autres, et à notre belle région !<br />
                </motion.p>

                <motion.p 
                    variants={itemVariants}
                    className=" mt-2 text-justify"
                > 
                    <strong>Diplômé en escalade, spéléologie, canoë-kayak et disciplines associées,</strong> je mets un point d&apos;honneur à vous guider en toute sécurité, avec bienveillance, écoute et bonne humeur.
                </motion.p>
                
                <motion.p 
                    variants={itemVariants}
                    className=" text-justify"
                >
                    En 2022, j&apos;ai créé <span className="font-bold">Occitanie Évasion </span> pour proposer des <span className="font-bold"> aventures à taille humaine</span>, où l&apos;essentiel est dans le partage, la rencontre et les moments simples vécus en pleine nature.
                </motion.p>
                
                <motion.h3 
                    variants={itemVariants}
                    className="mt-4 !text-4xl text-center lg:text-start text-secondary mb-2"
                >
                    Mon objectif ?
                </motion.h3>
                
                <motion.p 
                    variants={itemVariants}
                    className=" text-justify"
                >
                    Vous offrir plus qu&apos;une activité sportive : une parenthèse authentique, conviviale, respectueuse de chacun… et pleine de sourires !
                    <span className="text-secondary">😊</span>
                </motion.p>
            </motion.div>

            <motion.div 
                className="flex flex-col items-center justify-center w-full   lg:ml-12  lg:items-start p-4 lg:max-w-lg"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className="relative min-w-[300px]">
                    <motion.div variants={imageVariants}>
                        <Image 
                            src="/images/Home/Florent-session_escalade.webp" 
                            alt="Florent en escalade" 
                            width={300} 
                            height={300} 
                            className="rounded-lg object-cover object-center  aspect-square shadow-md shadow-black/50" 
                        />
                    </motion.div>
                    
                    <motion.div variants={backgroundImageVariants}>
                        <Image 
                            src="/images/Home/Florent-session_bg.webp" 
                            alt="Florent en arrière-plan" 
                            width={150} 
                            height={150}
                            className=" hidden lg:block rounded-lg object-cover object-center  aspect-square  absolute bottom-0 -left-10  translate-y-1/2 shadow-md shadow-black/50" 
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}


AboutSection.displayName = "AboutSection";
