"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import activities from "./activities";

// Définition des types pour les activités et les liens
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

type Props = {
  backgroundColor?: string;
};

function ScrollServices({ backgroundColor }: Props) {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionsRef.current,
      { x: 0 },
      {
        x: `-${(activities.length - 1) * 30}vw`,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `${activities.length * 1200} top`,
          scrub: 0.6,
          pin: true,
          markers: true,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section
      className="overflow-hidden"
      style={{ backgroundColor }}
    >
      <div ref={triggerRef} className="h-screen w-screen aaa">
        <div
          ref={sectionsRef}
          className={` flex flex-row w-[${activities.length * 30}vw] h-screen bbbbb`}
        >
          {activities.map((activity: Activity, idx: number) => (
            <article
              key={idx}
              className="relative h-screen w-screen  flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              <Image
                src={activity.image}
                alt={activity.alt}
                fill
                className="object-cover object-[70%_0%] w-full h-full"
                style={{ zIndex: 0 }}
              />
              <div
                className="absolute top-[30%] left-[5%] min-w-min w-[30%] max-w-max p-4 rounded-bl-xl rounded-tr-xl flex flex-col gap-2"
                style={{ zIndex: 1 }}
              >
                <h3 className="text-4xl lg:text-8xl font-bold text-white mb-2 drop-shadow-lg leading-none ">
                  {activity.title}
                </h3>
                <p className=" text-[whitesmoke] mb-4 text-lg lg:text-2xl">
                  {activity.text}
                </p>
                <div className="flex gap-6 py-4">
                  {activity.links.map((link: ActivityLink, lidx: number) => (
                    <Link
                      key={lidx}
                      href={link.href}
                      className={
                        link.style === "primary"
                          ? "px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition"
                          : "px-6 py-2 border border-white text-white rounded bg-white/20 hover:bg-white hover:text-black transition"
                      }
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ScrollServices; 